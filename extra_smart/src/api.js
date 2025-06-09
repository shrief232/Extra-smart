// api.js
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

let memoryAccessToken = null;
let memoryRefreshToken = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shrief.pythonanywhere.com',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// Getters
const getAccessToken = () => memoryAccessToken;
const getRefreshToken = () => memoryRefreshToken;

// Setters
const setAccessToken = (token) => {
  memoryAccessToken = token;
};
const setRefreshToken = (token) => {
  memoryRefreshToken = token;
};

// Removers
const removeAccessToken = () => {
  memoryAccessToken = null;
};
const removeRefreshToken = () => {
  memoryRefreshToken = null;
};

// Token Expiration Checker
const isTokenExpired = (token) => {
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch {
    return true;
  }
};

// Token Refresher
const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  try {
    const res = await api.post('/auth/token/refresh/', { refresh });
    setAccessToken(res.data.access);
    return res.data.access;
  } catch (err) {
    logout();
    throw err;
  }
};

api.interceptors.request.use(async (config) => {
  let token = getAccessToken();
  if (token && isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

// Axios Response Interceptor
api.interceptors.response.use(res => res, async (error) => {
  const original = error.config;
  if (error.response?.status === 403 && !original._retry) {
    original._retry = true;
    try {
      const newToken = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (err) {
      logout();
    }
  }
  return Promise.reject(error);
});

// Logout function
const logout = () => {
  removeAccessToken();
  removeRefreshToken();
  window.$resetRecoilState && window.$resetRecoilState($isAuthorized);
  window.location.href = '/login';
  setTimeout(() => window.location.reload(), 100);
};

export default api;
export { logout, setAccessToken, setRefreshToken, getAccessToken, getRefreshToken };





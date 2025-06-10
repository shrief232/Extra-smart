import axios from 'axios';
import { ACCESS_TOKEN } from './constants';
import { $isAuthorized } from './atoms/AuthAtom';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

// Getters
const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN);

// Setters
const setAccessToken = (token) => {
  sessionStorage.setItem(ACCESS_TOKEN, token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Removers
const removeAccessToken = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
  delete api.defaults.headers.common['Authorization'];
};

// Check Token Expiry
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch {
    return true;
  }
};

// Refresh Access Token
const refreshAccessToken = async () => {
  try {
    const response = await api.post('/auth/token/refresh/');
    const newAccessToken = response.data.access;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (err) {
    logout();
    throw err;
  }
};

// Axios Request Interceptor
api.interceptors.request.use(async (config) => {
  const token = getAccessToken();

  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  try {
    const newToken = await refreshAccessToken();
    config.headers.Authorization = `Bearer ${newToken}`;
    return config;
  } catch {
    return config;
  }
}, error => Promise.reject(error));

// Axios Response Interceptor
api.interceptors.response.use(res => res, async (error) => {
  const original = error.config;

  if (error.response?.status === 401 && !original._retry) {
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

// Logout Function
const logout = async () => {
  try {
    await api.post('/auth/logout/');
  } catch (e) {
    console.error('Logout error', e);
  } finally {
    removeAccessToken();
    window.$resetRecoilState?.($isAuthorized);
    window.location.href = '/login';
  }
};

export default api;
export {
  logout,
  setAccessToken,
  getAccessToken,
  refreshAccessToken, 
};

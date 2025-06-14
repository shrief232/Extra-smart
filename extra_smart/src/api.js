import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { $isAuthorized } from './atoms/AuthAtom';  

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/',
  withCredentials: true,

  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

let inMemoryAccessToken = null;


// Setters
const setAccessToken = (token) => { memoryAccessToken = token; };
const setRefreshToken = (token) => { memoryRefreshToken = token; };

// Removers
const removeAccessToken = () => { memoryAccessToken = null; };
const removeRefreshToken = () => { memoryRefreshToken = null; };

// Load tokens on app start
const loadTokensFromStorage = () => {
  const isSecure = import.meta.env.MODE === 'production';
  if (isSecure) {
    const access = Cookies.get(ACCESS_TOKEN);
    const refresh = Cookies.get(REFRESH_TOKEN);
    if (access) setAccessToken(access);
    if (refresh) setRefreshToken(refresh);
  } else {
    const access = localStorage.getItem(ACCESS_TOKEN);
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (access) setAccessToken(access);
    if (refresh) setRefreshToken(refresh);
  }

};
loadTokensFromStorage();

// Token expiration check
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

// Refresh token
const refreshAccessToken = async () => {

  const refresh = getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  try {
    const response = await api.post('/auth/token/refresh/');
    const newAccessToken = response.data.access;
    storeAccessTokenInMemory(newAccessToken);
    return newAccessToken;
  } catch (err) {
    logout(); // Call logout if token refresh fails
    throw err; // Re-throw the error so the caller knows refresh failed
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
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;


}, error => Promise.reject(error));

api.interceptors.response.use(res => res, async (error) => {
  const original = error.config;
  
  // Check if it's a 401, not a retry, and not a refresh token failure
  if (error.response?.status === 401 && !original._retry && original.url !== '/auth/token/refresh/') {
    original._retry = true;
    try {
      const newToken = await refreshAccessToken();
      original.headers.Authorization = `Bearer ${newToken}`; 
      return api(original);
    } catch (refreshError) {
      
    }
  }
  
  return Promise.reject(error);
});


const logout = () => {
  removeAccessToken();
  removeRefreshToken();

  const isSecure = import.meta.env.MODE === 'production';
  if (isSecure) {
    Cookies.remove(ACCESS_TOKEN, { path: '/' });
    Cookies.remove(REFRESH_TOKEN, { path: '/' });
  } else {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  window.$resetRecoilState && window.$resetRecoilState($isAuthorized);
  window.location.href = '/login';
  setTimeout(() => window.location.reload(), 100);
};

export default api;
export { logout, setAccessToken, setRefreshToken, getAccessToken, getRefreshToken };




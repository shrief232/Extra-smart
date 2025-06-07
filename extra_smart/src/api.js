import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shrief.pythonanywhere.com',
  withCredentials: true,
  xsrfCookieName: 'csrftoken',  
  xsrfHeaderName: 'X-CSRFToken',
});

const getAccessToken = () => {
  const fromCookie = Cookies.get(ACCESS_TOKEN);
  const fromLocalStorage = localStorage.getItem(ACCESS_TOKEN);

  const token =
    import.meta.env.MODE === 'production'
      ? fromCookie || fromLocalStorage
      : fromLocalStorage || fromCookie;

  if (token) {
    if (!fromCookie) Cookies.set(ACCESS_TOKEN, token);
    if (!fromLocalStorage) localStorage.setItem(ACCESS_TOKEN, token);
  }

  return token;
};

const setAccessToken = (token) => {
  Cookies.set(ACCESS_TOKEN, token, {
    secure: import.meta.env.MODE === 'production',
    sameSite: 'Lax',
    path: '/',
  });

  localStorage.setItem(ACCESS_TOKEN, token);
};

const removeAccessToken = () => {
  Cookies.remove(ACCESS_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
};

const getRefreshToken = () => {
  const fromCookie = Cookies.get(REFRESH_TOKEN);
  const fromLocalStorage = localStorage.getItem(REFRESH_TOKEN);

  const token =
    import.meta.env.MODE === 'production'
      ? fromCookie || fromLocalStorage
      : fromLocalStorage || fromCookie;

  if (token) {
    if (!fromCookie) Cookies.set(REFRESH_TOKEN, token);
    if (!fromLocalStorage) localStorage.setItem(REFRESH_TOKEN, token);
  }

  return token;
};

const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN, token, {
    secure: import.meta.env.MODE === 'production',
    sameSite: 'Strict',
    path: '/',
  });

  localStorage.setItem(REFRESH_TOKEN, token);
};

const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};


api.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();
    const csrfToken = Cookies.get('csrftoken');
    if (token && isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
      } catch (err) {
        console.error('Failed to refresh token, logging out');
        logout();
        return Promise.reject(err);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const isTokenExpired = (token) => {
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch (err) {
    return true;
  }
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    logout(); 
    throw new Error('No refresh token available');
  }

  try {
    const response = await api.post('/auth/token/refresh/', { 
      refresh: refreshToken 
    },  { withCredentials: true });

    setAccessToken(response.data.access);
    return response.data.access;

  } catch (error) {
    console.error('Failed to refresh token', error);
    logout();
    throw error;
  }
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        logout();
      }
    }
    
    return Promise.reject(error);
  }
);


const logout = () => {
 
  if (import.meta.env.MODE === 'production') {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  } else {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
    
   window.$resetRecoilState && window.$resetRecoilState($isAuthorized);
 
    window.location.href = '/login';
    setTimeout(() => window.location.reload(), 100);
};

export default api;
export { logout };
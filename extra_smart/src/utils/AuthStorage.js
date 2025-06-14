import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export const AuthStorage = {
  getAccessToken: () => sessionStorage.getItem(ACCESS_TOKEN),
  setAccessToken: (token) => sessionStorage.setItem(ACCESS_TOKEN, token),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN),
  setRefreshToken: (token) => localStorage.setItem(REFRESH_TOKEN, token),
  clear: () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }
};

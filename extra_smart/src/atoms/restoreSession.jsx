// restoreSession.ts
import { ACCESS_TOKEN } from '../constants'; 
import api from '../api'; 

export const restoreSession = async (setUser) => {
  const access = localStorage.getItem(ACCESS_TOKEN);

  if (access) {
    api.defaults.headers.common.Authorization = `Bearer ${access}`;
    try {
      const res = await api.get('/en/users/me/'); 
      setUser({ isAuthenticated: true, user: res.data });
    } catch {
      setUser({ isAuthenticated: false });
    }
  } else {
    try {
      const res = await api.post('/en/users/token/refresh/');
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      api.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;

      const me = await api.get('/en/users/me/');
      setUser({ isAuthenticated: true, user: me.data });
    } catch (err) {
      localStorage.removeItem(ACCESS_TOKEN);
      setUser({ isAuthenticated: false });
    }
  }
};

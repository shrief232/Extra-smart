import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'; // تأكد إن REFRESH_TOKEN معرف هنا
import api from '../api';

export default function AuthProvider({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN) || Cookies.get(ACCESS_TOKEN);

      if (token && token.split('.').length === 3) {
        try {
          const decoded = jwtDecode(token);
          const now = Date.now() / 1000;

          if (decoded.exp > now) {
            const user = {
              id: decoded.user_id || decoded.id || null,
              username: decoded.username || '',
              email: decoded.email || '',
            };

            setAuth({
              isRegularAuth: true,
              user: { ...user, token },
            });
          } else {
            try {
              const refresh = localStorage.getItem(REFRESH_TOKEN);

              if (!refresh) throw new Error('No refresh token found');

              const res = await api.post('/auth/token/refresh/', {
                refresh,
              });

              const newAccess = res.data.access;
              localStorage.setItem(ACCESS_TOKEN, newAccess);

              const decoded = jwtDecode(newAccess);
              const user = {
                id: decoded.user_id || decoded.id || null,
                username: decoded.username || '',
                email: decoded.email || '',
              };

              setAuth({
                isRegularAuth: true,
                user: { ...user, token: newAccess },
              });
            } catch (err) {
              console.error('Token refresh failed in AuthProvider:', err);

            }
          }
        } catch (e) {
          console.error('Token decode error:', e);
        }
      }
    };

    initAuth();
  }, [setAuth]);

  return <>{children}</>;
}

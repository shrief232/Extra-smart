import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api, { logout } from '../api';

export default function AuthProvider({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const initAuth = async () => {
      const getToken = (tokenName) => {
        return import.meta.env.MODE === 'production'
          ? Cookies.get(tokenName)
          : localStorage.getItem(tokenName);
      };

      const accessToken = getToken(ACCESS_TOKEN);
      const refreshToken = getToken(REFRESH_TOKEN);

      if (!accessToken) {
        setAuth({ isRegularAuth: false, user: null, loading: false });
        return;
      }

      try {
        const decoded = jwtDecode(accessToken);
        const now = Date.now() / 1000;
        const isExpired = decoded.exp < now;

        if (!isExpired) {
          const user = {
            id: decoded.user_id || decoded.sub || null,
            username: decoded.username || decoded.preferred_username || '',
            email: decoded.email || '',
          };

          setAuth({ isRegularAuth: true, user, loading: false });
          return;
        }

        if (!refreshToken) {
          logout();
          setAuth({ isRegularAuth: false, user: null, loading: false });
          return;
        }

        try {
          const response = await api.post('/auth/token/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;

          if (import.meta.env.MODE === 'production') {
            Cookies.set(ACCESS_TOKEN, newAccessToken, {
              secure: true,
              sameSite: 'Strict',
              expires: 1,
            });
          } else {
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
          }

          const newDecoded = jwtDecode(newAccessToken);
          const user = {
            id: newDecoded.user_id || newDecoded.sub || null,
            username: newDecoded.username || newDecoded.preferred_username || '',
            email: newDecoded.email || '',
          };

          setAuth({ isRegularAuth: true, user, loading: false });
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          logout();
          setAuth({ isRegularAuth: false, user: null, loading: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
        setAuth({ isRegularAuth: false, user: null, loading: false });
      }
    };

    initAuth();
  }, [setAuth]);

  return <>{children}</>;
}

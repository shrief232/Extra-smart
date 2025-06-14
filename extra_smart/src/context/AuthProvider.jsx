import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';
import { jwtDecode } from 'jwt-decode';
import api, { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, logout } from '../api';

export default function AuthProvider({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const init = async () => {
      const access = getAccessToken();
      const refresh = getRefreshToken();

      if (!access) {
        setAuth({ isRegularAuth: false, user: null, loading: false });
        return;
      }

      try {
        const decoded = jwtDecode(access);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp > now) {
          const user = {
            id: decoded.user_id || decoded.sub || null,
            username: decoded.username || decoded.preferred_username || '',
            email: decoded.email || '',
          };
          setAuth({ isRegularAuth: true, user, loading: false });
          return;
        }

        if (!refresh) {
          logout();
          setAuth({ isRegularAuth: false, user: null, loading: false });
          return;
        }

        const res = await api.post('/auth/token/refresh/', { refresh });
        const newAccess = res.data.access;
        setAccessToken(newAccess);

        const newDecoded = jwtDecode(newAccess);
        const user = {
          id: newDecoded.user_id || newDecoded.sub || null,
          username: newDecoded.username || newDecoded.preferred_username || '',
          email: newDecoded.email || '',
        };
        setAuth({ isRegularAuth: true, user, loading: false });
      } catch (err) {
        console.error('Auth init failed', err);
        logout();
        setAuth({ isRegularAuth: false, user: null, loading: false });
      }
    };

    init();
  }, [setAuth]);

  return <>{children}</>;
}

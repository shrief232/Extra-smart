import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';
import { jwtDecode } from 'jwt-decode';
import api, { getAccessToken } from '../api';

export default function AuthProvider({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const initAuthState = async () => {
      const access = getAccessToken();

      if (!access) {
        setAuth({ isRegularAuth: false, user: null, loading: false });
        return;
      }

      try {
        
        const decoded = jwtDecode(access);
        const now = Math.floor(Date.now() / 1000);
        
        if (decoded.exp > now) {
          setAuth({
            isRegularAuth: true,
            user: {
              id: decoded.user_id,
              username: decoded.username || '',
              email: decoded.email || '',
            },
            loading: false
          });
          return;
        }

        
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            const newDecoded = jwtDecode(newToken);
            setAuth({
              isRegularAuth: true,
              user: {
                id: newDecoded.user_id,
                username: newDecoded.username || '',
                email: newDecoded.email || '',
              },
              loading: false
            });
            return;
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }

        
        setAuth({ isRegularAuth: false, user: null, loading: false });
      } catch (err) {
        console.error('Auth init failed', err);
        setAuth({ isRegularAuth: false, user: null, loading: false });
      }
    };

    initAuthState();
  }, [setAuth]);

  return <>{children}</>;
}


async function refreshAccessToken() {
  try {
    const response = await api.post('/auth/token/refresh/');
    return response.data.access;
  } catch (error) {
    console.error('Refresh token failed:', error);
    return null;
  }
}
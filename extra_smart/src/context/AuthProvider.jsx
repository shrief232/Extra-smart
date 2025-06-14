import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';
import { jwtDecode } from 'jwt-decode';

import api, { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, logout } from '../api';


export default function AuthProvider({ children }) {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const initAuthState = async () => {
      try {
        // Attempt to refresh the token on load.
        // apiRefreshAccessToken will store it in memory if successful.
        const newAccessToken = await apiRefreshAccessToken();

        if (newAccessToken) {
          const decoded = jwtDecode(newAccessToken);
          // No need to check expiry here again if refreshAccessToken guarantees a fresh token
          // or if subsequent API calls will handle expired tokens via interceptors.
          // For UI purposes, decoding it is enough.
          setAuth({
            isRegularAuth: true,
            user: {
              id: decoded.user_id,
              username: decoded.username || '',
              email: decoded.email || '',
              // Add any other relevant user fields from the token
            },
            loading: false,
          });
        } else {
          // This case might be redundant if apiRefreshAccessToken throws an error on failure,
          // which would be caught by the outer catch block.
          // However, if it can return null/undefined on certain non-error failures:
          setAuth({ isRegularAuth: false, user: null, loading: false });
        }
      } catch (error) {
        // This catch block handles failures from apiRefreshAccessToken (e.g., network error, invalid refresh token)
        console.error('Auth Provider: Token refresh failed on init:', error);
        setAuth({ isRegularAuth: false, user: null, loading: false });
      }
    };

    // Set loading to true initially before attempting to refresh
    setAuth(prev => ({ ...prev, loading: true }));
    initAuthState();
  }, [setAuth]);

  return <>{children}</>;
}


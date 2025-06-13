import { useEffect } from 'react';
import { refreshAccessToken, getAccessTokenFromMemory, isTokenExpired } from '../api';
import { useSetRecoilState } from 'recoil';
import { $isAuthorized } from '../atoms/AuthAtom';

export default function useAuthCheck() {
  const setAuth = useSetRecoilState($isAuthorized);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAccessTokenFromMemory();
        if (token && !isTokenExpired(token)) {
          return; // Token still valid
        }
        
        
        await refreshAccessToken();
      } catch {
        setAuth({ 
          isRegularAuth: false,
          isGoogleAuth: false,
          user: null, 
          accessToken: null, 
          loading: false 
        });
      }
    };

    const interval = setInterval(checkAuth, 300000);
    checkAuth(); 

    return () => clearInterval(interval);
  }, [setAuth]);
}
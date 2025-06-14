import { AuthStorage } from './AuthStorage';

export const logout = async (navigate) => {
  try {
    AuthStorage.clear();

    if (window.authSetter) {
      window.authSetter({
        isRegularAuth: false,
        isGoogleAuth: false,
        user: null,
        accessToken: null,
        loading: false,
      });
    }
    window.authSetter = null;

    if (navigate) navigate('/login', { replace: true });
  } catch (e) {
    console.error("Logout error", e);
  }
};

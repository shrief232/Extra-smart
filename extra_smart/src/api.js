import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://shrief.pythonanywhere.com',
  withCredentials: true, 
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

let inMemoryAccessToken = null;

const storeAccessTokenInMemory = (token) => {
  inMemoryAccessToken = token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const getAccessTokenFromMemory = () => {
  return inMemoryAccessToken;
};

const clearAccessTokenFromMemory = () => {
  inMemoryAccessToken = null;
  delete api.defaults.headers.common['Authorization'];
};

const removeRefreshToken = () => {
 
};

// Token Expiration Checker
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch {
    return true;
  }
};

// Token Refresher
const refreshAccessToken = async () => {
  try {
    const response = await api.post('/auth/token/refresh/');
    const newAccessToken = response.data.access;
    storeAccessTokenInMemory(newAccessToken);
    return newAccessToken;
  } catch (err) {
    logout(); // Call logout if token refresh fails
    throw err; // Re-throw the error so the caller knows refresh failed
  }
};

api.interceptors.request.use(async (config) => {
  let token = getAccessTokenFromMemory();
  
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  // If token is expired or doesn't exist, try to refresh it
  try {
    const newToken = await refreshAccessToken(); // refreshAccessToken now stores the token in memory
    config.headers.Authorization = `Bearer ${newToken}`; // Set header for the current request
    return config;
  } catch (e) {
    // If refresh fails, logout will be called by refreshAccessToken, which also clears the token.
    // The request will proceed without an Authorization header.
    // The response interceptor will handle the 401 if the endpoint requires auth.
    return config;
  }
}, error => Promise.reject(error));

// Axios Response Interceptor
api.interceptors.response.use(res => res, async (error) => {
  const original = error.config;
  
  // Check if it's a 401, not a retry, and not a refresh token failure
  if (error.response?.status === 401 && !original._retry && original.url !== '/auth/token/refresh/') {
    original._retry = true;
    try {
      const newToken = await refreshAccessToken(); // Stores the new token in memory
      original.headers.Authorization = `Bearer ${newToken}`; // Update header for the retried request
      return api(original);
    } catch (refreshError) {
      // refreshAccessToken already called logout() if it failed catastrophically
      // If logout wasn't called (e.g. specific error types), ensure it's called here.
      // However, the current plan is refreshAccessToken calls logout on failure.
      // So, this path might primarily be for cleanup or redirect if not already handled.
      // The logout() function will handle redirecting to login.
      // No need to call logout() again if refreshAccessToken already did.
    }
  }
  
  return Promise.reject(error);
});

// Logout function
const logout = async () => {
  try {
    // Attempt to logout from the backend. This might fail if the token is already invalid,
    // but we should try to invalidate the session on the server side.
    await api.post('/auth/logout/');
  } catch (e) {
    console.error('Logout API call error', e);
  } finally {
    clearAccessTokenFromMemory(); // Use the new function
    // The recoil state reset and redirect logic remains the same.
    // Assuming $isAuthorized is available in this scope or globally for the reset.
    // If not, this part might need adjustment depending on how $isAuthorized is managed.
    // For now, we'll keep it as is, assuming window.$resetRecoilState and $isAuthorized are correctly set up.
    if (window.$resetRecoilState && typeof $isAuthorized !== 'undefined') {
      window.$resetRecoilState($isAuthorized);
    } else if (window.$resetRecoilState) {
        // console.warn('$isAuthorized not defined for Recoil reset during logout.');
        // Attempt to reset all states if specific atom is not available.
        // This is a fallback and might not be desired.
        // Consider passing the Recoil atom to the logout function if this becomes an issue.
    }
    window.location.href = '/login';
  }
};

export default api;
// Export the new token management functions if they need to be used outside this module,
// otherwise, keep them internal. For now, `logout` is the main public function.
// `setAccessToken` and `getAccessToken` are removed as per plan.
export { logout };
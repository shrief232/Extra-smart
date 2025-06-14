import { jwtDecode } from 'jwt-decode';

export const safeDecode = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};

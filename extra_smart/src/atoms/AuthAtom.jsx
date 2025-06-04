
import { atom } from 'recoil';

export const $isAuthorized = atom({
  key: 'authState', 
  default: {
    isRegularAuth: false,
    user: null,
    loading: true, 
  },
});
// export const $googleAuth = atom({
//   key: 'googleAuth', 
//   default: {
//     isGoogleAuth: false,
//     user: null,
//   },
// });

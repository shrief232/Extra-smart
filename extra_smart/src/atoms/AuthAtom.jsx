// authAtom.js
import { atom } from 'recoil';

export const $isAuthorized = atom({
  key: 'isAuthorized', 
  default: {
    isRegularAuth: false,
    isGoogleAuth: false,
    user: null,
  },
});

// export const $googleAuth = atom({
//   key: 'googleAuth', 
//   default: {
//     isGoogleAuth: false,
//     user: null,
//   },
// });

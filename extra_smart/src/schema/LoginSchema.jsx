// src/auth/validationSchemas.js
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

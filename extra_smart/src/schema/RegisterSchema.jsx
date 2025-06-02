import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('user name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });
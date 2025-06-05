import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, IconButton,InputAdornment, Stack, useMediaQuery, useTheme } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN } from '../constants';
import api from '../api';
// import {$googleAuth} from '../Atoms/googleAtom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';  
import CustomFormProvider from '../hooks-form/FormProvider';
import RHFTextField from '../hooks-form/RHFTextFiled';
import { $isAuthorized } from '../atoms/AuthAtom';
import { useRecoilState } from 'recoil';
import { LoginSchema } from '../schema/LoginSchema';
import { useEnrollment } from '../context/EnrollmentContext';



export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regularAuth, setRegularAuth] = useRecoilState($isAuthorized);
  const location = useLocation();
  // const [googleAuth, setGoogleAuth] = useRecoilState($googleAuth);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { fetchEnrolledCourses } = useEnrollment();

 
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const { handleSubmit } = methods;

  const handleRegularLogin = async (data) => {
    setLoading(true);
    try {
      const response = await api.post('/en/users/token/', {
        username: data.username,
        password: data.password, 
      });

      const { access, refresh, user } = response.data;
      const isSecure = import.meta.env.MODE === 'production'; 


      Cookies.set(ACCESS_TOKEN, access, { path: '/', secure:isSecure, sameSite: 'lax' });
      Cookies.set(REFRESH_TOKEN, refresh, { path: '/', secure:isSecure, sameSite: 'Lax' });
      if  (response.data.access && response.data.refresh) {

          localStorage.setItem(ACCESS_TOKEN, response.data.access);
          localStorage.setItem(REFRESH_TOKEN, response.data.refresh);

          Cookies.set(ACCESS_TOKEN, response.data.access, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });
          
          Cookies.set(REFRESH_TOKEN, response.data.refresh, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
          });
      
          
      } else {
          console.error('Access or refresh token is undefined:', { access, refresh });
      }

      setRegularAuth({
        isRegularAuth: true,
        user: response.data.user,
      });
      
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
      toast.success('Login successful');
      await fetchEnrolledCourses(); 

    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'ERR_NETWORK') {
        toast.error('Cannot connect to server. Check if backend is running.');
      } else {
        toast.error(error.response?.data?.detail || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = async (credentialResponse) => {
  //   const { credential } = credentialResponse;

  //   if (!credential) {
  //     console.error('No credential received');
  //     return toast.error('Failed to retrieve Google credential.');
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await api.post('/en/api/auth/google/login/', { token: credential });
  //     const { access, user } = response.data;
  //     const isSecure = process.env.NODE_ENV === 'production';

  //     Cookies.set(GOOGLE_ACCESS_TOKEN, access, { path: '/', secure: isSecure, sameSite: 'Strict' });

  //     setGoogleAuth({
  //       isGoogleAuth: true,
  //       user: { ...user, token: access },
  //     });

  //     navigate('/welcome');
  //     toast.success('Google login successful');
  //     onClose();
  //   } catch (error) {
  //     console.error('Google login error:', error.response?.data || error.message);
  //     toast.error('Failed to log in with Google');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGoogleFailure = (error) => {
  //   console.error('Google login error:', error);
  //   toast.error('Google login failed. Please try again.');
  // };

  return (
    <CustomFormProvider methods={methods} onSubmit={handleSubmit(handleRegularLogin)}>
      <Stack spacing={3} sx={{ width: isMobile ? '100%' : '450px' }}>
        <RHFTextField name="username" placeholder="Enter your username" fullWidth />
        <RHFTextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 1 }}>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#4568f1',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'common.white'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
          loading={loading}
        >
          Login
        </Button>
        {/* <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleFailure}
        /> */}
      </Stack>
    </CustomFormProvider>
  );
}

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Icon } from '@iconify/react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
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
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { fetchEnrolledCourses } = useEnrollment();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
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

      if (access && refresh) {
        // Set tokens in localStorage
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);

        // Set cookies securely
        Cookies.set(ACCESS_TOKEN, access, {
          path: '/',
          secure: isSecure,
          sameSite: 'Strict',
        });
        Cookies.set(REFRESH_TOKEN, refresh, {
          path: '/',
          secure: isSecure,
          sameSite: 'Strict',
        });

        // Update auth state
        setRegularAuth({
          isRegularAuth: true,
          user,
        });

        const redirectTo = location.state?.from?.pathname || '/';
        navigate(redirectTo, { replace: true });
        toast.success('Login successful');

        await fetchEnrolledCourses();
      } else {
        console.error('Access or refresh token is undefined:', { access, refresh });
        toast.error('Unexpected login response. Try again.');
      }
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
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'common.white',
            '&:hover': {
              bgcolor: 'white',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
          disabled={loading}
        >
          Login
        </Button>
      </Stack>
    </CustomFormProvider>
  );
}

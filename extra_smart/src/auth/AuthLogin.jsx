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
import { toast } from 'react-toastify';

import api, { storeAccessTokenInMemory } from '../api';
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
      // إرسال الطلب مع withCredentials: true
      const response = await api.post('/en/users/token/', {
        username: data.username,
        password: data.password,
      }, { withCredentials: true });

      const { access, user } = response.data;

      if (!access) {
        throw new Error('Missing access token');
      }

      // تخزين الـ access token في sessionStorage
      storeAccessTokenInMemory(access);

      setRegularAuth({
        isRegularAuth: true,
        user,
      });

      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
      toast.success('Login successful');

      await fetchEnrolledCourses();
    } catch (error) {
      console.error('Login error:', error);
      const message =
        error.code === 'ERR_NETWORK'
          ? 'Cannot connect to the server. Check your internet or server.'
          : error.response?.data?.detail || 'Login failed. Please try again.';
      toast.error(message);
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
            color: 'common.white',
            '&:hover': {
              bgcolor: 'white',
              color: theme => theme.palette.mode === 'light' ? '#4568f1' : 'grey.800',
            },
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Stack>
    </CustomFormProvider>
  );
}
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconButton,
  InputAdornment,
  Stack,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import CustomFormProvider from '../hooks-form/FormProvider';
import RHFTextField from '../hooks-form/RHFTextFiled';
import { RegisterSchema } from '../schema/RegisterSchema';

// checkIfEmailExists
const checkIfEmailExists = async (email) => {
  try {
    const response = await api.post('/en/users/check-email/', { email });
    return response.data;
  } catch (error) {
    console.error('Email check error:', error.response?.data || error.message);
    return { exists: false, is_verified: false };
  }
};

export default function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit } = methods;

  const handleRegularLogin = async (data) => {
    setLoading(true);
    try {
      const { exists, is_verified } = await checkIfEmailExists(data.email);
      
      if (exists) {
        if (!is_verified) {
          setUserEmail(data.email);
          setShowVerifyDialog(true);
          toast.warning("Email exists but not verified. Please check your inbox.");
        } else {
          toast.error("Email already registered. Please login.");
        }
        setLoading(false);
        return;
      }

      const response = await api.post('/en/users/register/', {
        email: data.email,
        username: data.username,
        password: data.password,
        password2: data.confirmPassword,
      });

      if (response.data?.detail?.includes('verify')) {
        setUserEmail(data.email);
        setShowVerifyDialog(true);
        toast.success('Verification email sent!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.email?.[0] || 
                          error.response?.data?.password?.[0] || 
                          'Registration failed. Please check your connection.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowVerifyDialog(false);
    navigate('/login');
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      await api.post('/en/users/verify-email/', { email: userEmail });
      toast.success('Verification email resent! Check your inbox.');
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to resend. Try again later.';
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <CustomFormProvider methods={methods} onSubmit={handleSubmit(handleRegularLogin)}>
      <Stack spacing={3} sx={{ width: isMobile ? '100%' : '450px' }}>
        <RHFTextField name="email" label="Email" placeholder="Enter your email" />
        <RHFTextField name="username" label="Username" placeholder="Enter your name" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
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
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? 'Processing...' : 'Create Account'}
        </Button>

        <Dialog open={showVerifyDialog} onClose={handleCloseDialog}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Icon icon="mdi:email-check" width={40} height={40} />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Verify Your Email
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              We've sent a verification link to:
              <br />
              <strong>{userEmail}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Check your spam/junk folder
              <br />
              • Link expires in 24 hours
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleResendVerification}
              disabled={resendLoading}
              startIcon={
                resendLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Icon icon="ic:round-email" />
                )
              }
            >
              {resendLoading ? 'Sending...' : 'Resend'}
            </Button>
            <Button
              variant="contained"
              onClick={handleCloseDialog}
              endIcon={<Icon icon="mdi:check-circle" />}
            >
              I'm Verified
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </CustomFormProvider>
  );
}

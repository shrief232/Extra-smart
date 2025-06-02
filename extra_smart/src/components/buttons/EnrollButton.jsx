import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
  Card,
  Typography
} from '@mui/material';
import api from '../../api';
import { useEnrollment } from '../../context/EnrollmentContext';
import UpdateProfile from '../../pages/profile/UpdateProfile';
import { useTranslation } from 'react-i18next';
import Eng from '../../assets/Eng.png';

export default function EnrollButton({ courseId }) {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [user, setUser] = useState(null); 
  const {t} = useTranslation();

  const { enrollInCourse } = useEnrollment();

  const handleCheckUserProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get('/en/users/user/');
      const userData = res.data;
      setUser(userData); 

      const isComplete = Boolean(
        userData.first_name &&
        userData.last_name &&
        userData.phone_number &&
        userData.company_name &&
        userData.job_title
      );

      if (!isComplete) {
        setDialogType('incomplete');
      } else {
        setDialogType('instructions');
      }
      setOpenDialog(true);
    } catch (error) {
      console.error('Failed to fetch user info', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (formData) => {
    try {
      const res = await api.patch('/en/users/user/', formData);
      const updatedUser = res.data;
      setUser(updatedUser); 
      setDialogType('instructions');
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await api.post(`/en/courses/${courseId}/enroll/`);
      enrollInCourse(courseId);
      setOpenSnackbar(true);
      setOpenDialog(false);
    } catch (error) {
      console.error('Registration failed', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDialogContent = () => {
    if (dialogType === 'incomplete') {
      return (
        <>
          <DialogTitle>استكمال البيانات</DialogTitle>
          <DialogContent>
            {user && <UpdateProfile user={user} onSubmit={handleProfileSubmit} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          </DialogActions>
        </>
      );
    } else if (dialogType === 'instructions') {
      return (
        <>
          <DialogTitle>{t('before_starting_course')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              👋 {t('welcome')}
              <Card 
              sx={{
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
                mb: 2,
                }}
              >
                <CardMedia 
                  component="img"
                  image={Eng}
                  alt="Eng"
                  sx={{ maxWidth: '150px', height: 'auto', borderRadius: 2 }}
                />
             
                <ul>
                  <li>{t('instruction_1')}</li>
                  <li>{t('instruction_2')}</li>
                  <li>{t('instruction_3')}</li>
                </ul>
              </Card>
            </DialogContentText>
            <Typography variant="body1" color="text.secondary">{t('ready')}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>{t('back')}</Button>
            <Button variant="contained" onClick={handleEnroll}>
            {t('start_course')}
            </Button>
          </DialogActions>
        </>
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckUserProfile}
        disabled={loading}
        sx={{ width: '60%' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register Now'}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Registration successful!
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {renderDialogContent()}
      </Dialog>
    </Box>
  );
}

import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { $isAuthorized } from '../../atoms/AuthAtom';
import Cookies from 'js-cookie';

export default function LogOut() {
  const resetAuthState = useResetRecoilState($isAuthorized);
  const navigate = useNavigate();

  const handleLogout = () => {
    const tokens = [ACCESS_TOKEN, REFRESH_TOKEN];
    if (import.meta.env.MODE === 'production') {
      tokens.forEach(token => Cookies.remove(token, { path: '/login' }));
    } else {
      tokens.forEach(token => localStorage.removeItem(token));
    }
    localStorage.removeItem('enrolledCourses');

    resetAuthState();

    navigate('/login');

    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <MenuItem onClick={handleLogout} aria-label="Logout">
      <ListItemIcon>
        <Logout fontSize="small" sx={{ mr: 1 }} />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}

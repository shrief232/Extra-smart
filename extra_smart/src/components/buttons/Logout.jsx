import { ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { $isAuthorized } from '../../atoms/AuthAtom';
import Cookies from 'js-cookie';

export default function LogOut() {
  const [isAuthorized, setIsAuthorized] = useRecoilState($isAuthorized);
  const navigate = useNavigate();

 // LogOut.js
const handleLogout = () => {
  setIsAuthorized({
    isRegularAuth: false,
    user: null,
  });
  [ACCESS_TOKEN, REFRESH_TOKEN].forEach(token => {
    Cookies.remove(token, { path: '/' });
    localStorage.removeItem(token);
    localStorage.removeItem('enrolledCourses');
  });

  window.location.href = '/login';
  alert('Logged out successfully');
};
    
  

  if (!isAuthorized.isRegularAuth) return null;

  return (
    <MenuItem onClick={handleLogout}>
      <ListItemIcon>
        <Logout fontSize="small" sx={{ ml: '5px' }} />
      </ListItemIcon>
      Logout
    </MenuItem>
  );
}

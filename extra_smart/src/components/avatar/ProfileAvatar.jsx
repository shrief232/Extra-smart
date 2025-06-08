import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import React from 'react';
import Logout from '../buttons/Logout';
import ToggleButton from '../buttons/ToggleButton';
import ProfileImage from './ProfileImage';
import SmallAvatar from './SmallAvatar';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';


export default function ProfileAvatar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = !!localStorage.getItem('access_token');
  const mode = localStorage.getItem('themeMode') ;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleProfileClick = () => {
    navigate('/profile');
  }


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("en/users/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError(
          error.response?.data?.detail || "Error fetching profile data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!isLoggedIn) return null;

  return (
    <>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <ProfileImage />
      </IconButton>
      <Menu
        sx={{
          mt: '10px',
          '& .MuiPaper-root': {
            borderRadius: '20px',
            width: 320,
            padding: '12px 16px',
            // backgroundColor: themeMode === 'dark '? '#1e1e1e' : '#fff',
            
          },
        }}
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Top User Info */}
          <Stack direction="column" spacing={2} alignItems="center">
            <Avatar src={user?.profile_image || undefined} alt={user?.username || 'User'} sx={{ width: 70, height: 70 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography fontWeight="bold">Hi, {user?.first_name}! {user?.is_active ? <Icon icon='nrk:user-notloggedin-active' color="#147b06"/> : <Icon icon='nrk:user-notloggedin-active' color="#fff"/>}</Typography>
              <Typography variant="body2" color="text.secondary">
              {user?.email}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="outlined"
             onClick={() => {
                handleProfileClick();
                handleCloseUserMenu(); 
              }}
            fullWidth
            sx={{
              mt: 1,
            
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '14px',
              '&:hover': {
                borderColor: '#666',
              },
            }}
          >
            Manage your Account
          </Button>

          <Divider sx={{ borderColor: '#444', my: 1 }} />

          {/* Settings Section */}
          {/* <MenuItem sx={{}}>
            <Box flexGrow={1}>Search history</Box>
            <Typography variant="caption" color="text.secondary">
              Saving
            </Typography>
          </MenuItem> */}

          {/* <MenuItem sx={{ color: 'white' }}>
            Delete last 15 minutes
          </MenuItem> */}

          {/* <MenuItem sx={{  color: ''  }}>Saves & Collections</MenuItem>
          <MenuItem sx={{}}>Search personalization</MenuItem> */}

          {/* <Divider sx={{ borderColor: '#444', my: 1 }} /> */}

          {/* <MenuItem sx={{ }}>
            SafeSearch
            <Box flexGrow={1} />
            <Typography variant="caption" color="gray">
              Blurring on
            </Typography>
          </MenuItem> */}

          <MenuItem 
           onClick={handleCloseUserMenu} 
          sx={{  }}>
            Language
            <Box flexGrow={1} />
            <Typography variant="caption" color="text.secondary">
              English
            </Typography>
          </MenuItem>

          <Divider sx={{ borderColor: '#444', my: 1 }} />

          {/* Custom buttons */}
          <ToggleButton />
          <Logout />
        </Box>
      </Menu>
    </>
  );
}

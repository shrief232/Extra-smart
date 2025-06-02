import { Avatar, CircularProgress, ListItemIcon, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

export default function SmallAvatar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        //   error.response?.data?.detail || "Error fetching profile data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfile = () => {
    navigate('/profile');
  };

  if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

  const avatarContent = user?.profile_image
    ? null
    : (user?.username?.charAt(0)?.toUpperCase() || 'U');

  return (
    <>
      
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
            <Avatar sx={{width:'28px', height:'28px',  mr: '10px'}} src={user?.profile_image || undefined} alt={user?.username || 'User'}>
                {avatarContent}
            </Avatar>
        </ListItemIcon>
        profile
      </MenuItem>
    </>
  );
}

import { Avatar, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function ProfileImage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <CircularProgress />;


  const avatarContent = user?.profile_image
    ? null
    : (user?.username?.charAt(0)?.toUpperCase() || 'U');

  return (
    <>
      <Avatar
        sx={{width:'34px', height:'34px'}}
       src={user?.profile_image || undefined} alt={user?.username || 'User'}>
        {avatarContent}
      </Avatar>
    </>
  );
}

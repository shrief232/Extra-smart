import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Avatar,
  Slide,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import api from '../../api';

export default function UserStats() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Error fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Typography>Loading stats...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return null;

  return (
    <Grid container spacing={3}>
      {/* Last Login */}
      <Grid item xs={12} md={6}>
        <Slide in direction="up" style={{ transitionDelay: '100ms' }} timeout={500}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <AccessTimeIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Last Login
                  </Typography>
                  <Typography variant="h6">
                    {new Date(user.last_login).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Slide>
      </Grid>

      {/* Date Joined */}
      <Grid item xs={12} md={6}>
        <Slide in direction="up" style={{ transitionDelay: '200ms' }} timeout={500}>
          <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <CalendarTodayIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date Joined
                  </Typography>
                  <Typography variant="h6">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color={user.is_active ? 'success.main' : 'error.main'}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  );
}

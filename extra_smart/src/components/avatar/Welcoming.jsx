import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Alert,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import api from '../../api';
import White from '../../assets/location1.png';

export default function Welcoming() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // أقل من 600px

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

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const formattedTime = dateTime.toLocaleTimeString();
  const formattedDate = dateTime.toLocaleDateString();
  const dayName = dateTime.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Box sx={{ width: '98%', position: 'relative' }}>
      {/* التاريخ والوقت */}
      <Card
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          bgcolor: '#ffffff22',
          backdropFilter: 'blur(8px)',
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          zIndex: 1,
        }}
      >
        <Icon icon="mdi:clock-time-four-outline" width="28" height="28" />
        <Typography variant="body2">{formattedDate}</Typography>
        <Typography variant="body2">{formattedTime}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{dayName}</Typography>
      </Card>

    
      <Card 
        sx={{ 
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'row',
          gap: 2,
          bgcolor: theme.palette.mode === 'dark' ? '#5856d685' : '#5856d6',
          backdropFilter: 'blur(10px)', 
          p: 3, 
          mb: 3, 
          borderRadius: "15px", 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ textAlign: isMobile ? 'center' : 'start' }}>
          <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ color: 'white' }}>
            Good Day Eng. {user.first_name || user.username || "N/A"}
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ color: 'white', mt: 1 }}>
            Happy {dayName}!
          </Typography>
        </Box>

        <Box display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
          <CardMedia
             component="img"
              image={White}
              alt="Welcome Image"
              sx={{
                width: { xs: 100, sm: 150, md: 180, lg: 210 },
                height: { xs: 180, sm: 220, md: 240, lg: 260 },
                objectFit: 'contain'
              }}
          />
        </Box>
      </Card>  
    </Box>
  );
}

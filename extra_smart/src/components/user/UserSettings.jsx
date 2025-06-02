// components/UserSettings.jsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';

export default function UserSettings() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Account Settings</Typography>
      <Button variant="contained" color="primary">Change Password</Button>
      <Button variant="outlined" color="error" sx={{ ml: 2 }}>
        Delete Account
      </Button>
    </Box>
  );
}

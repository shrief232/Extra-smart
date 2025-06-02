import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  Grid,
  Paper,
  Divider,
  Tabs,
  Tab,
  Stack,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarRateIcon from '@mui/icons-material/StarRate';

function MyPayments() {
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Box p={3}>
      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Joined: Jan 2024
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <Box mt={3}>
        <Tabs value={tab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Courses" />
          <Tab label="Achievements" />
          <Tab label="Stats" />
          <Tab label="Settings" />
        </Tabs>
        <Divider />

        {tab === 0 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Current Courses
            </Typography>
            {/* Render user's courses with progress etc */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1">React for Beginners</Typography>
              <Typography variant="body2">Progress: 80%</Typography>
            </Paper>
          </Box>
        )}

        {tab === 1 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <Stack spacing={2} direction="row">
              <Paper sx={{ p: 2 }}>
                <EmojiEventsIcon color="warning" /> Badge: Top Performer
              </Paper>
            </Stack>
          </Box>
        )}

        {tab === 2 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Stack spacing={1}>
              <Typography><AccessTimeIcon fontSize="small" /> Time spent: 45h</Typography>
              <Typography><SchoolIcon fontSize="small" /> Courses Completed: 5</Typography>
              <Typography><StarRateIcon fontSize="small" /> Avg Rating: 4.5 / 5</Typography>
            </Stack>
          </Box>
        )}

        {tab === 3 && (
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <Typography variant="body2">Change password, notifications, language, etc.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MyPayments;

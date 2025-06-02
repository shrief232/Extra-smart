import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Divider,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

import UserProgress from './UserProgress';
import UserAchievements from './UserAchievements';
import UserStats from './UserStats';

export default function ProfileTabs() {
  const [tab, setTab] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const renderTabContent = () => {
    const content = (() => {
      switch (tab) {
        case 0:
          return <UserAchievements />;
        case 1:
          return <UserProgress />;
        case 2:
          return <UserStats />;
        default:
          return null;
      }
    })();

    return (
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: isSmall ? 'center' : 'flex-start',
          textAlign: isSmall ? 'center' : 'left',
        }}
      >
        {content}
      </Box>
    );
  };

  return (
    <Box mt={3}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isSmall ? 'center' : 'flex-start',
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Courses" />
          <Tab label="Achievements" />
          <Tab label="Stats" />
        </Tabs>
      </Box>

      <Divider sx={{ my: 2, mb: 5 }} />
      {renderTabContent()}
    </Box>
  );
}

import React from 'react';
import {
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ProfileInfo from './ProfileInfo';
import Welcoming from '../../components/avatar/Welcoming';
import ProfileTabs from '../../components/user/ProfileTabs';

export default function ProfilePage() {
  const [tab, setTab] = React.useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md')); // md = 960px

  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        display: 'flex',
        flexDirection: isSmall ? 'column' : 'row',
      }}
    >
      {/* Profile Info first on small screens */}
      <Box
        sx={{
          width: isSmall ? '100%' : '30%',
          order: isSmall ? 0 : 1, // Make it appear first on small screens
          mb: isSmall ? 3 : 0,
        }}
      >
        <ProfileInfo />
      </Box>

     

      {/* Welcoming + Tabs */}
      <Box
        sx={{
          width: isSmall ? '100%' : '75%',
          order: isSmall ? 1 : 0,
        }}
      >
        <Welcoming />
        <Box mt={3}>
          <ProfileTabs />
        </Box>
      </Box>
       {!isSmall && (
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      )}
    </Box>
  );
}

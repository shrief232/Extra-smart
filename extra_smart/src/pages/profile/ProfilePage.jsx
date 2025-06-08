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
  const isSmall = useMediaQuery(theme.breakpoints.down('md')); 

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
      
      <Box
        sx={{
          width: isSmall ? '100%' : '35%',
          order: isSmall ? 0 : 1, 
          mb: isSmall ? 3 : 0,
        }}
      >
        <ProfileInfo />
      </Box>

     
      <Box
        sx={{
          width: isSmall ? '100%' : '70%',
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

import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Slide,
  Avatar,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import api from '../../api';

export default function UserAchievements() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    api.get('/en/profiles/user-course-profile/')
      .then(res => setAchievements(res.data))
      .catch(err => console.error(err));
  }, []);

  if (achievements.length === 0) {
    return <Typography>No achievements yet.</Typography>;
  }

  return (
   <Grid
    container
    spacing={3}
    justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
  >
      {achievements.map((ach, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Slide
            in
            direction="up"
            style={{ transitionDelay: `${index * 100}ms` }}
            timeout={500}
          >
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: 3,
                width: '100%',
                maxWidth: 350,
                '@media (max-width:600px)': {
                  p: 1.5,
                  '& .MuiTypography-h6': { fontSize: '1rem' },
                  '& .MuiTypography-body2': { fontSize: '0.85rem' },
                  '& .MuiAvatar-root': { width: 30, height: 30 },
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EmojiEventsIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" noWrap>
                      {ach.course?.title || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {ach.course?.description || 'No description'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ach.course?.lessons_count || 0} Lessons
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Slide>
        </Grid>
      ))}
  </Grid>

  );
}

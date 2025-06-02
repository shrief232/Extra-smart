import React, { useEffect, useState } from 'react';
import api from '../../api';
import {
  Grid, Card, CardContent, Typography, Box,
  Tooltip, Avatar, Divider, Stack, Slide,
  useMediaQuery, useTheme
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Gauge } from '@mui/x-charts/Gauge';

export default function UserProgress() {
  const [profiles, setProfiles] = useState([]);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    api.get(`/en/profiles/user-course-profile/`)
      .then(res => setProfiles(res.data))
      .catch(err => console.error(err));
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m`;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: isSmall ? 'center' : 'flex-start' }}>
      <Grid
        container
        spacing={3}
        sx={{
          maxWidth: isSmall ? '100%' : 'none',
          justifyContent: isSmall ? 'center' : 'flex-start',
        }}
      >
        {profiles.map((profile, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Slide in direction="up" style={{ transitionDelay: `${index * 150}ms`, transitionDuration: '500ms' }}>
              <Card
                sx={{
                  p: isSmall ? 1 : 2,
                  boxShadow: 4,
                  borderRadius: 3,
                  mt: 4,
                }}
              >
                <CardContent>
                  <Typography variant={isSmall ? 'subtitle1' : 'h6'} gutterBottom>
                    {profile.course.title}
                  </Typography>

                  <Box sx={{ width: '100%', height: isSmall ? 100 : 150 }}>
                    <Gauge
                      value={profile.progress_percentage || 0}
                      startAngle={-90}
                      endAngle={90}
                      valueMin={0}
                      valueMax={100}
                      text={`${Math.round(profile.progress_percentage || 0)}%`}
                      sx={{
                        '--gauge-color': (profile.progress_percentage || 0) >= 100 ? 'limegreen' : '#1976d2',
                        fontSize: isSmall ? '0.7rem' : '1rem'
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={1}>
                    <Typography fontSize={isSmall ? '0.85rem' : '1rem'}>
                      <GradeIcon fontSize="small" sx={{ mr: 1 }} />
                      Final Exam: <b>{profile.final_exam_score}%</b>
                    </Typography>
                    <Typography fontSize={isSmall ? '0.85rem' : '1rem'}>
                      <GradeIcon fontSize="small" sx={{ mr: 1 }} />
                      Quizzes: <b>{profile.quiz_score}%</b>
                    </Typography>
                    <Typography fontSize={isSmall ? '0.85rem' : '1rem'}>
                      <TimerIcon fontSize="small" sx={{ mr: 1 }} />
                      Time Spent: <b>{formatTime(profile.total_time_spent)}</b>
                    </Typography>
                    <Typography fontSize={isSmall ? '0.85rem' : '1rem'}>
                      <GradeIcon fontSize="small" sx={{ mr: 1 }} />
                      Rating: <b>{profile.user_rating ? `${profile.user_rating}/5` : '—'}</b>
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <CheckCircleIcon
                        color={profile.is_course_completed ? 'success' : 'error'}
                        sx={{ mr: 1, fontSize: isSmall ? 18 : 24 }}
                      />
                      <Typography
                        color={profile.is_course_completed ? 'success.main' : 'error.main'}
                        fontSize={isSmall ? '0.85rem' : '1rem'}
                      >
                        {profile.is_course_completed ? 'Course Completed' : 'Course Not Completed'}
                      </Typography>
                    </Box>

                    {profile.certificate && (
                      <Tooltip title="Download Certificate">
                        <Avatar
                          sx={{
                            mt: 2,
                            bgcolor: 'primary.main',
                            width: isSmall ? 24 : 30,
                            height: isSmall ? 24 : 30,
                          }}
                        >
                          <EmojiEventsIcon fontSize="small" />
                        </Avatar>
                      </Tooltip>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Icon } from '@iconify/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function LessonList({ courseId, onSelect, selected, watchedLessons }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;
    const fetchLessons = async () => {
      try {
        const { data } = await api.get(`/en/courses/${courseId}/lessons/`);
        setLessons(data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme => theme.palette.mode === 'dark' ? '#2844B5' : '#f5f5f5',
          borderRadius: 2,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme => theme.palette.mode === 'dark' ? '#2844B5' : '#c1c1c1',
          borderRadius: 4,
          '&:hover': {
            backgroundColor: theme => theme.palette.mode === 'dark' ? '#2844B5' : '#a8a8a8',
          },
        },
        scrollbarWidth: 'thin',
        scrollbarColor: '#576CBD #4568F1',
        transition: theme => theme.transitions.create('scrollbar-color', { duration: 100 }),
      }}
    >
      {lessons.map(lesson => (
        <ListItem key={lesson.id} disablePadding>
          <ListItemButton
            selected={lesson.video_file === selected}
            onClick={() => onSelect(lesson)}
            sx={{
              borderRadius: 2,
              mb: 1,
              gap: 2,
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            }}
          >
            <Icon
              icon="fluent:video-clip-48-filled"
              width={24}
              height={24}
              style={{ marginRight: 8 }}
            />
            <ListItemText
              primary={lesson.title}
              primaryTypographyProps={{
                noWrap: true,
                title: lesson.title,
                sx: { fontSize: '0.95rem' },
              }}
            />
            {lesson.is_watched &&  (
              <CheckCircleIcon color="success" />
            )}
            <ListItemText
              primary={`${lesson.duration_minutes} min`}
              primaryTypographyProps={{
                noWrap: true,
                sx: { fontSize: '0.9rem', textAlign: 'right' },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

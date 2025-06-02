import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Card,
  useMediaQuery,
  CardMedia,
  Button
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import VideoDisplay from '../../components/courseList/VideoDisplay';
import LessonList from '../../components/courseList/LessonsList';
import RatingsAndReviews from '../../components/ratings/Ratings&reviews';
import RatingResult from '../../components/ratings/RatingResult';
import EnrollButton from '../../components/buttons/EnrollButton';
import { useEnrollment } from '../../context/EnrollmentContext';
import Slide from '@mui/material/Slide';
import { Icon } from '@iconify/react/dist/iconify.js';
import Quizzes from '../../components/Quizzes/Quizzes';
import QuizResult from '../../components/Quizzes/QuizResult';
import Sitting from '../../assets/sitting.png';
import { motion } from "framer-motion";
import { useCourse } from '../../context/CourseContext';
import LessonQuestions from '../../components/userQuestion/LessonQuestions';

const MotionBox = motion(Box);

export default function CoursePage({ courseId, title, onLessonSelect, initialLessonId, }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [value, setValue] = useState(0);
  const { enrolledCourses } = useEnrollment();
  const isEnrolled = enrolledCourses.includes(courseId);
  const [showLessons, setShowLessons] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { lessonsState, updateLessonState } = useCourse();
  
  useEffect(() => {
    const fetchResult = async (lessonId) => {
      try {
        const { data } = await api.get(`en/quizzes/results/?lesson=${lessonId}`);
        updateLessonState(lessonId, 'quizResult', data?.total > 0 ? data : null);
      } catch {
        updateLessonState(lessonId, 'quizResult', null);
      }
    };
    
    if (selectedLesson) {
      const lessonId = selectedLesson.id;
      fetchResult(lessonId);
      updateLessonState(lessonId, 'showQuiz', false);
    }
  }, [selectedLesson]);

  useEffect(() => {
    if (initialLessonId) {
      const fetchLesson = async () => {
        const lesson = await api.get(`/lessons/${initialLessonId}/`);
        setSelectedLesson(lesson);
        onLessonSelect(lesson);
      };
      fetchLesson();
    }
  }, [initialLessonId]);

  const handleVideoWatched = (lessonId) => {
    updateLessonState(lessonId, 'videoWatched', true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentLessonState = selectedLesson 
    ? lessonsState[selectedLesson.id] || {}
    : {};

  return (
    <Box sx={{
      flexGrow: 1,
      px: 2,
      py: 4,
      maxWidth: "1600px",
      margin: "auto",
    }}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 5 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Course Content" />
          <Tab label="Ratings & Reviews" />
        </Tabs>
      </Box>

      {value === 0 ? (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            mt: 5,
            display: 'flex',
            gap: 2,
            flexDirection: {
              xs: 'column',
              md: showLessons ? 'row-reverse' : 'column',
            },
            alignItems: 'stretch',
          }}
        >
          {showLessons && (
            <Card
              sx={{
                p: 2,
                borderRadius: 2,
                position: 'relative',
                width: {
                  xs: '100%',
                  md: '45%',
                },
                minHeight: '505px',
              }}
            >
              <IconButton
                onClick={() => setShowLessons(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  zIndex: 20,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'primary.light', color: '#fff' },
                }}
              >
                <Icon icon={'mdi:chevron-up'} width={28} height={28} />
              </IconButton>

              <Slide direction="down" in={showLessons} mountOnEnter unmountOnExit>
                <Box
                  elevation={3}
                  sx={{
                    pt: 5,
                    height: '60vh',
                    overflowY: 'auto',
                    borderRadius: 2,
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {isEnrolled ? 'Lessons' : 'Register to view lessons'}
                  </Typography>

                  {isEnrolled ? (
                    <LessonList
                      courseId={courseId}
                      onSelect={(lesson) => {
                        setSelectedLesson(lesson);
                        if (onLessonSelect) onLessonSelect(lesson); 
                      }} 
                      selected={selectedLesson?.video_file}
                      watchedLessons={[1, 2, 3]}
                    />
                  ) : (
                    <EnrollButton courseId={courseId} />
                  )}
                </Box>
              </Slide>
            </Card>
          )}

          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'transparent',
              minHeight: '505px',
              width: '100%',
            }}
          >
            {!showLessons && (
              <IconButton
                onClick={() => setShowLessons(true)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 20,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'primary.light', color: '#fff' },
                }}
              >
                <Icon icon={'mdi:chevron-down'} width={28} height={28} />
              </IconButton>
            )}

            {selectedLesson ? (
              <>
                <VideoDisplay 
                  url={selectedLesson.video_file} 
                  lessonId={selectedLesson.id} 
                  onWatched90={() => handleVideoWatched(selectedLesson.id)} 
                />
                
                <Box sx={{ width: '100%', mt: 3 }}>
                  {currentLessonState.quizResult ? (
                    <QuizResult 
                      result={currentLessonState.quizResult} 
                      onRetry={() => {
                        updateLessonState(selectedLesson.id, 'quizResult', null);
                        updateLessonState(selectedLesson.id, 'showQuiz', true);
                      }}
                    />
                  ) : currentLessonState.videoWatched ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ textAlign: 'center' }}
                    >
                      {!currentLessonState.showQuiz ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => updateLessonState(selectedLesson.id, 'showQuiz', true)}
                          sx={{ mb: 3 }}
                        >
                          Start Quiz 🚀
                        </Button>
                      ) : (
                        <Quizzes
                          lessonId={selectedLesson.id}
                          videoWatched={currentLessonState.videoWatched}
                          setQuizResult={(result) => 
                            updateLessonState(selectedLesson.id, 'quizResult', result)}
                        />
                        
                      )}
                       <Box sx={{ width: '100%', mt: 5 }}>
                        {selectedLesson && (
                            <LessonQuestions lessonId={selectedLesson.id} />
                          )}
                        </Box>
                    </motion.div>
                  ) : null}
                  
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <MotionBox
                  initial={{ x: isSmallScreen ? -100 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CardMedia
                    component="img"
                    image={Sitting}
                    alt="sitting"
                    sx={{
                       width: { xs: 100, sm: 150, md: 170, lg: 200 },
                       height: { xs: 180, sm: 220, md: 220, lg: 260 },
                       maxWidth: "200px", height: "auto", borderRadius: 2 }}
                  />
                </MotionBox>
                <Typography variant="body1" color="text.secondary">
                  Choose a lesson to view the video.
                </Typography>
              </Box>
            )}
          </Paper>
        </MotionBox>
      ) : (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Rating & Reviews
          </Typography>
          <RatingResult courseId={courseId} />
          <RatingsAndReviews courseId={courseId} />  
        </Box>
      )}
    </Box>
  );
}
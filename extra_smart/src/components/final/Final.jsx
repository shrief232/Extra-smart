// Quizzes.jsx
import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel,
  Button, CircularProgress, useTheme, useMediaQuery, Box, Alert, Divider, Chip
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';


const MotionBox = motion(Box);

const Final = ({ courseId,  setFinalResult }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const checkCourseCompletion = async () => {
      try {
        const { data } = await api.get(`en/courses/${courseId}/`);
        setIsCourseCompleted(data.is_completed);
      } catch (error) {
        console.error('فشل في التحقق من إكمال الكورس:', error);
      }
    };

    if (courseId) {
      checkCourseCompletion();
    }
  }, [courseId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await api.get(`en/final/questions/${courseId}`);
        setQuestions(data);
        console.log(data);
      } catch {
        setError('فشل تحميل أسئلة الامتحان النهائي');
      } finally {
        setLoading(false);
      }
    };

    if (courseId ) {
      setQuestions([]);
      setCurrentIndex(0);
      setAnswers({});
      setError(null);
      setLoading(true);
      fetchQuestions();
    }
  }, [courseId, ]);

  const handleSelect = (questionId, choiceId) => {
    setAnswers(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const submitAnswer = async (questionId, choiceId) => {
    try {
      setSubmitting(true);
      await api.post('en/final/submit-answer/', {
        question: questionId,
        selected_choice: choiceId,
      });
    } catch (err) {
      throw new Error(err.response?.data?.detail || 'حدث خطأ أثناء إرسال الإجابة');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    const currentQuestion = questions[currentIndex];
    const selectedChoice = answers[currentQuestion.id];

    if (!selectedChoice) {
      setError('يرجى اختيار إجابة قبل المتابعة');
      return;
    }

    try {
      await submitAnswer(currentQuestion.id, selectedChoice);
      setError(null);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const { data } = await api.get('en/final/result/',{
            params: { course: courseId } 
        });
        setFinalResult(data);
        
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isCourseCompleted) { 
    return (
      <Alert severity="warning" sx={{ mt: 4 }}>
        يجب مشاهدة جميع دروس الكورس قبل البدء في الامتحان النهائي 🎓
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Box sx={{ width: '80%', mt: 10 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          <Card sx={{ mb: 3, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  السؤال {currentIndex + 1} من {questions.length}
                </Typography>
                <Chip label={`نقاط: ${currentQuestion.points}`} color="secondary" />
              </Box>

              <Typography variant="h5" sx={{ mb: 3 }}>
                {currentQuestion.text}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleSelect(currentQuestion.id, parseInt(e.target.value))}
              >
                {currentQuestion?.choices?.map((choice) => (
                  <FormControlLabel
                    key={choice.id}
                    value={choice.id}
                    control={<Radio color="primary" />}
                    label={<Typography variant="body1">{choice.text}</Typography>}
                    sx={{
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!answers[currentQuestion.id] || submitting}
              size="large"
              sx={{ minWidth: 140 }}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : currentIndex === questions.length - 1 ? (
                'إنهاء الامتحان ✅'
              ) : (
                'التالي ➔'
              )}
            </Button>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Final;

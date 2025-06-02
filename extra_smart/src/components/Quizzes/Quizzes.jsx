// Quizzes.js
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  CardMedia,
  Box,
  Alert,
  Divider,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api';
import QuizResult from './QuizResult';

const MotionBox = motion(Box);

const Quizzes = ({ lessonId, videoWatched, setQuizResult }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`en/quizzes/questions/?lesson=${lessonId}`);
        setQuestions(data);
      } catch {
        setError('فشل تحميل الأسئلة');
      } finally {
        setLoading(false);
      }
    };

    if (lessonId && videoWatched) {
      setQuestions([]);
      setCurrentIndex(0);
      setAnswers({});
      setError(null);
      setLoading(true);
      fetchData();
    }
  }, [lessonId, videoWatched]);

  const handleSelect = (questionId, choiceId) => {
    setAnswers(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const submitAnswer = async (questionId, choiceId) => {
    try {
      setSubmitting(true);
      await api.post('en/quizzes/submit-answer/', {
        question: questionId,
        selected_choice: choiceId,
      });
    } catch (err) {
      throw new Error(err.response?.data?.detail || 'حدث خطأ في الإرسال');
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
        const { data } = await api.get(`en/quizzes/results/?lesson=${lessonId}`);
        setQuizResult(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!videoWatched) return null;

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
    <Box sx={{ width: '100%', mt: 3 }}>
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
                {currentQuestion.choices.map((choice) => (
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
                'إنهاء الاختبار ✅'
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

export default Quizzes;
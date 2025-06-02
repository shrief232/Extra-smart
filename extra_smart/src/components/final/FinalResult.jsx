// QuizResult.js
import React from 'react';
import { 
  Card, 
  Typography, 
  Chip, 
  CardMedia, 
  useMediaQuery, 
  useTheme, 
  Box,
  Alert,
  Button 
} from '@mui/material';
import { motion } from 'framer-motion';
import Flower from '../../assets/flowers.png';

const MotionBox = motion(Box);

const FinalResult = ({ result, onRetry }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!result || !result.score) {
    return (
      <Alert severity="warning" sx={{ mt: 3 }}>
        لا توجد نتائج متاحة لهذا الاختبار
      </Alert>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Card sx={{ mt: 3, p: 4, textAlign: 'center', boxShadow: 3 }}>
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
            image={Flower}
            alt="flower"
            sx={{ maxWidth: "200px", height: "auto", borderRadius: 2 }}
          />
        </MotionBox>
        <Typography variant="h4" gutterBottom sx={{ color: 'success.main' }}>
          النتيجة 🎉
        </Typography>
        <Chip
          label={`${result.score}/${result.total}`}
          color="success"
          sx={{ fontSize: '2rem', p: 3, mb: 3 }}
        />
        {/* <Button
          variant="outlined"
          color="primary"
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          إعادة الاختبار
        </Button> */}
      </Card>
    </motion.div>
  );
};

export default FinalResult;
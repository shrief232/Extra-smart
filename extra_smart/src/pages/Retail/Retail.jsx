import { Box, Typography } from '@mui/material';
import React from 'react';
import CoursePage from '../coursePage/CoursePage';
import Welcoming from '../../components/avatar/Welcoming';
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Retail() {
  return (
    <Box sx={{ width: '95%', ml: '10px', mr: '10px' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Welcoming />
        </MotionBox>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Retail COURSE
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Good Luck .
        </Typography>
      </Box>
      <CoursePage courseId={5} />
    </Box>
  );
}
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Rating, Typography } from '@mui/material';
import api from '../../api';

export default function RatingResult({ courseId }) {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const res = await api.get(`/en/courses/${courseId}/stats/`);
        setAverageRating(res.data.average_rating);
        setTotalReviews(res.data.total_reviews);
      } catch (error) {
        console.error('فشل تحميل بيانات التقييم:', error);
      }
    };

    fetchRatingData();
  }, [courseId]);

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Course Rating
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={averageRating} precision={0.2} readOnly />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {averageRating.toFixed(1)} / 5
          </Typography>
        </Box>
        <Typography color="text.secondary">
          {totalReviews} Reviews
        </Typography>
      </Paper>
    </Box>
  );
}

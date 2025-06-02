import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import api from '../../api';



export default function RatingsAndReviews({ courseId }) {
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/en/courses/${courseId}/reviews/`);
      setReviews(res.data);
    } catch (error) {
      console.error('فشل تحميل المراجعات:', error);
    }
  };

  const handleSubmit = async () => {
    if (reviewText.trim() ) {
      try {
        await api.post(`/en/courses/${courseId}/reviews/`, {
            rating,
            comment: reviewText,    
        });
        
        setReviewText('');
        setRating(0);
        fetchReviews();
      } catch (error) {
        console.error('فشل إرسال المراجعة:', error);
        if (error.response?.data) {
            console.log('Server validation errors:', error.response.data);
          }
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  return (
    <Box sx={{ width: '90%', margin: 'auto', mt: 5 }}>
     

      {/* Review Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Leave a Review
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Typography>Rating:</Typography>
          <Rating
             name="user-rating"
             value={rating}
             onChange={(_, newValue) => setRating(newValue)}
             precision={1}
             required
          />
        </Stack>

        <TextField
          label="Write your review here"
          multiline
          fullWidth
          minRows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!reviewText.trim()}
        >
          إرسال المراجعة
        </Button>
      </Paper>

      {/* Existing Reviews */}
      <Box>
        {reviews.length === 0 ? (
          <Typography color="text.secondary">
            لا توجد مراجعات حتى الآن.
          </Typography>
        ) : (
          reviews.map((review) => (
            <Paper
              key={review.id}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
              }}
            >
              <Rating value={review.rating} readOnly />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" color="text.secondary">
                {review.first_name} {review.last_name} - {new Date(review.created_at).toLocaleDateString()}
              </Typography>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
}

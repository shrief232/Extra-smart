import React, { useState } from 'react'
import Final from '../../../components/final/Final'
import { Box, Typography } from '@mui/material'
import Welcoming from '../../../components/avatar/Welcoming';

export default function HDFinal() {
  const [finalResult, setFinalResult] = useState(null);

  return (
    <Box sx={{ width:'95%',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Welcoming />  
      <Final courseId={1}  setFinalResult={setFinalResult} />
      {finalResult && (
        <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            النتيجة النهائية: {finalResult.score}/{finalResult.total_questions}
          </Typography>
          <Typography variant="body1">
            نسبة النجاح: {((finalResult.score / finalResult.total_questions) * 100).toFixed(1)}%
          </Typography>
        </Box>
      )}
    </Box>
  )
}

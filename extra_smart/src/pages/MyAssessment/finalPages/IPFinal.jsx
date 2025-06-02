import React, { useState } from 'react'
import Final from '../../../components/final/Final'
import { Box, Typography } from '@mui/material'

export default function IPFinal() {
  const [finalResult, setFinalResult] = useState(null);

  return (
    <Box sx={{ width:'100%',display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Final courseId={2}  setFinalResult={setFinalResult} />
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

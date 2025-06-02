import { Box } from '@mui/material'
import React from 'react'
import welcome from '../../assets/waveHand.mp4'

export default function Character() {
  return (
    <Box sx={{ml:'5rem'}}>
      <video 
        src={welcome} 
        autoPlay 
        loop 
        muted 
        style={{ width: '180px', height: '250px' }} 
      />
    </Box>
  )
}

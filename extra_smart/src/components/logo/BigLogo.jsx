import { CardMedia } from '@mui/material'
import React from 'react'
import Logo from '../../assets/extra-logo.png'

export default function BigLogo() {
  return (
    <CardMedia 
      component="img"
      image={Logo}
      alt="Logo"
      sx={{
        width: {
          xs: '60%',      
          sm: '60%',      
          md: '40%',      
          lg: '400px',    
        },
        height: 'auto',
        maxWidth: 600,
        margin: '0 auto',
        display: 'block',
        borderRadius: 2,
      }}
    />
  )
}

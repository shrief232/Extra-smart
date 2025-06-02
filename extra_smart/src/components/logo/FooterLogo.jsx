import { CardMedia } from '@mui/material'
import React from 'react'
import Logo from '../../assets/extra-logo.png'

export default function FooterLogo() {
  return (
    <>
      <CardMedia 
        component="img"
        image={Logo}
        alt="Logo"
        sx={{
          width: "150px",
          height: "auto",
          maxWidth: 600,
          display: "block",
          borderRadius: 2,
        }}
      />
    </>
  )
}

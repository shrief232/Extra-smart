import { CardMedia } from '@mui/material'
import React from 'react'
import Logo from '../../assets/extra-logo.png'

export default function NavLogo() {
  return (
    <>
    <CardMedia 
      component="img"
      image={Logo}
      alt="Logo"
      sx={{
        width: "60px",
        height: "auto",
        maxWidth: 600,
        margin: "0 auto",
        display: "block",
        borderRadius: 2,
      }}
    />
  </>
  )
}

import { Box, Typography } from '@mui/material'
import React from 'react'
import AuthLogin from '../auth/AuthLogin'
import { Link } from 'react-router-dom'
import BigLogo from '../components/logo/BigLogo'

export default function LoginPage() {
  return (
    <Box 
    sx={{ 
      width:'100%', 
      alignContent :'center', 
      alignItems: "center", 
      display: "flex",
      flexDirection:'column' ,
      height: "100vh" 
      }}>
      <Box 
      sx={{ 
        width:'100%',
        alignContent :'center', 
        alignItems: "center", 
        display: "flex",
        flexDirection:'column' , 
        pt: 10 }}>
        <BigLogo/>
      
      </Box>
      
      <AuthLogin />
      <Typography sx={{ marginTop: 2 }}>
        Don`t have an account? <Link style={{textDecoration:'none',  color: 'blue'}} to="/register">Register</Link>
      </Typography>
    </Box>
  )
}

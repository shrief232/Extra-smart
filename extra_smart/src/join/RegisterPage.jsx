import { Box, Typography } from '@mui/material'
import React from 'react'
import AuthRegister from '../auth/AuthRegister'
import { Link } from 'react-router-dom'
import BigLogo from '../components/logo/BigLogo'

export default function RegisterPage() {
  return (
    <Box sx={{ width:'100%', alignContent :'center', alignItems: "center", display: "flex",flexDirection:'column' ,height: "100vh" }}>
      <Box 
      sx={{ 
        width:'100%', 
        alignContent :'center', 
        alignItems: "center", 
        display: "flex",
        flexDirection:'column' , 
        pt: 10, 
        }}>
        <BigLogo/>
        <Typography sx={{pb: 2}}>
          Register Page
        </Typography>
      </Box>
      
      <AuthRegister />
       <Typography sx={{ marginTop: 2 }}>
         Already have an account? <Link style={{textDecoration:'none',  color: 'blue'}} to="/login">Login</Link>
      </Typography>
    </Box>
  )
}

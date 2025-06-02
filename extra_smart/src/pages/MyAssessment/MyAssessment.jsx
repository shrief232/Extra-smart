import React, { useState } from 'react'
import Final from '../../components/final/Final'
import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import Welcoming from '../../components/avatar/Welcoming';
import { useNavigate } from 'react-router-dom';
import Hd_BG from '../../assets/hd-cvi-1.webp';
import Imou from '../../assets/imou.png';
import Ip_dahua from '../../assets/ip.jpeg';
import Commax from '../../assets/commax.jpeg';
import Sales from '../../assets/sales.webp'

export default function MyAssessment() {
  const navigate = useNavigate();

  const linkToFinal =()=>{
    navigate('/finalhd')
  };

  return (
    <Box sx={{ width: '95%', ml: '10px', mr: '10px' ,display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
     <Welcoming />
     <Typography variant="h4" fontWeight="bold" gutterBottom>
          FINAL ASSESSMENT
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Good Luck  .
        </Typography>
        <Divider sx={{ width: '100%', my: 2, mt: 8 }} />
     <Grid container spacing={2} sx={{ mt: 8, width:'90%', alignItems: 'center', justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card 
          onClick={linkToFinal} 
          sx={{boxShadow: 3, 
          display: 'flex', 
          width: '380px',
          height: '250px',
          borderRadius:'10px',
          flexDirection: 'column', 
          alignItems: 'center',
          cursor: 'pointer',
          backgroundImage: `url(${Hd_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position:'relative',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
          },
         
          }}>
            <Box 
            sx={{ 
              width:'100%',
              height:'15%', 
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#1A1A1A' : '#f5f5f5',  
              borderRadius:'10px 0px 0px 10px 10px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',  
              posision:'fixed', 
              top:0, 
              left:0,
              pt: 0
               }}>
              <Typography variant="h6" sx={{ }}>
                Dahua HD Final Assessment
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <Card 
            onClick={linkToFinal} 
            sx={{boxShadow: 3, 
            display: 'flex', 
            width: '380px',
            height: '250px',
            borderRadius:'10px',
            flexDirection: 'column', 
            alignItems: 'center',
            cursor: 'pointer',
            backgroundImage: `url(${Ip_dahua})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position:'relative',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            },
         
          }}>
            <Box 
            sx={{ 
              width:'100%',
              height:'15%', 
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#1A1A1A' : '#f5f5f5',  
              borderRadius:'10px 0px 0px 10px 10px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex', 
              posision:'fixed', 
              top:0, 
              left:0,
              pt: 0
               }}>
              <Typography variant="h6" sx={{ }}>
                Dahua IP Final Assessment
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
           <Card 
          onClick={linkToFinal} 
          sx={{boxShadow: 3, 
          display: 'flex', 
          width: '380px',
          height: '250px',
          borderRadius:'10px',
          flexDirection: 'column', 
          alignItems: 'center',
          cursor: 'pointer',
          backgroundImage: `url(${Imou})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position:'relative',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
          },
         
          }}>
            <Box 
            sx={{ 
              width:'100%',
              height:'15%', 
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#1A1A1A' : '#f5f5f5',  
              borderRadius:'10px 0px 0px 10px 10px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex', 
              posision:'fixed', 
              top:0, 
              left:0,
              pt: 0
               }}>
              <Typography variant="h6" sx={{ }}>
                Dahua IMOU Final Assessment
              </Typography>
            </Box>
          </Card>
        </Grid>
         <Grid item xs={12} sm={6} md={4}>
           <Card 
            onClick={linkToFinal} 
            sx={{boxShadow: 3, 
            display: 'flex', 
            width: '380px',
            height: '250px',
            borderRadius:'10px',
            flexDirection: 'column', 
            alignItems: 'center',
            cursor: 'pointer',
            backgroundImage: `url(${Commax})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position:'relative',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease',
            },
         
          }}>
            <Box 
            sx={{ 
              width:'100%',
              height:'15%', 
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#1A1A1A' : '#f5f5f5', 
              borderRadius:'10px 0px 0px 10px 10px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex', 
              posision:'fixed', 
              top:0, 
              left:0,
              pt: 0
               }}>
              <Typography variant="h6" sx={{ }}>
                Commax Intercome Final Assessment
              </Typography>
            </Box>
          </Card>
        </Grid>
         <Grid item xs={12} sm={6} md={4}>
           <Card 
          onClick={linkToFinal} 
          sx={{boxShadow: 3, 
          display: 'flex', 
          width: '380px',
          height: '250px',
          borderRadius:'10px',
          flexDirection: 'column', 
          alignItems: 'center',
          cursor: 'pointer',
          backgroundImage: `url(${Sales})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position:'relative',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
          },
         
          }}>
            <Box 
            sx={{ 
              width:'100%',
              height:'15%', 
              backgroundColor: theme => theme.palette.mode === 'dark' ? '#1A1A1A' : '#f5f5f5',  
              borderRadius:'10px 0px 0px 10px 10px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex', 
              posision:'fixed', 
              top:0, 
              left:0,
              pt: 0
               }}>
              <Typography variant="h6" sx={{ }}>
                Sales Final Assessment
              </Typography>
            </Box>
          </Card>
        </Grid>
        
     </Grid>
   
     
    </Box>
  )
}

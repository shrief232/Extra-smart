// Footer.tsx
import { Box, Grid, Typography, Link, IconButton, Button, Divider } from '@mui/material';
import {
  Facebook, Twitter, Instagram, YouTube, LinkedIn
} from '@mui/icons-material';
import FooterLogo from '../logo/FooterLogo';

export default function Footer() {
  return (
    <Box component="footer" sx={{
      width: '100%',  
     
      px: 4,
      py: 6,
      position: 'relative',
      mt: 12,
      p: 10
    }}>
      <Divider sx={{ mb: 8 }} />  
      <Grid container spacing={20}>
        {/* Logo and Description */}
        <Grid item xs={12} md={4}  sx={{ mb: 2 , alignItems:'flex-start'}}>
          <Box sx={{ mb: 2 , justifyContent:'flex-start'}}>
            <FooterLogo /> 
          </Box>  
           
         
          <Typography variant="h6" color='text.secondary' sx={{ mb: 2 }}>
            Empowering students and educators with innovative tools and <br/> inclusive learning experiences across the globe.
          </Typography>
        </Grid>

        {/* Menu */}
        <Grid item xs={6} sm={4} md={2} lineHeight={3} >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Menu</Typography>
          <Link href="#" color="inherit" underline="hover" display="block">Courses</Link>
          <Link href="#" color="inherit" underline="hover" display="block">Blog</Link>
          <Link href="#" color="inherit" underline="hover" display="block">About</Link>
          <Link href="#" color="inherit" underline="hover" display="block">Contact</Link>
        </Grid>

        {/* Legal */}
        <Grid item xs={6} sm={4} md={2} lineHeight={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Legal</Typography>
          <Link href="#" color="inherit" underline="hover" display="block">Privacy Policy</Link>
          <Link href="#" color="inherit" underline="hover" display="block">Terms of Service</Link>
        </Grid>

        {/* Products / Features */}
        <Grid item xs={6} sm={4} md={2} lineHeight={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Features</Typography>
          <Link href="#" color="inherit" underline="hover" display="block">Live Classes</Link>
          <Link href="#" color="inherit" underline="hover" display="block">Certificates</Link>
          <Link href="#" color="inherit" underline="hover" display="block">Mobile App</Link>
        </Grid>
        
      </Grid>

      {/* Social Icons */}
      <Box sx={{ mt: 5, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ mt: 5, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <IconButton href="#" color="inherit"><Facebook /></IconButton>
            <IconButton href="#" color="inherit"><Twitter /></IconButton>
            <IconButton href="#" color="inherit"><Instagram /></IconButton>
            <IconButton href="#" color="inherit"><YouTube /></IconButton>
            <IconButton href="#" color="inherit"><LinkedIn /></IconButton>
        </Box>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 5, mr:8 ,opacity: 0.6 }}>
            © {new Date().getFullYear()} Extra Smart Edu-Platform. All rights reserved.
        </Typography>
        </Box>
      {/* CTA Button */}
      <Button variant="contained" color="primary"
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 5,
          textTransform: 'none',
        }}
      >
        Contant Us
      </Button>
    </Box>
  );
}

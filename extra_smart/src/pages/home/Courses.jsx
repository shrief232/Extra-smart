import React from "react";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  useTheme,
  Button,
  Container,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import White from "../../assets/location2.png";
import AboutCards from "../../components/aboutUs/AboutCards";
import { useNavigate } from 'react-router-dom';
import FeaturesSection from "../../components/aboutUs/FeaturesSection";
import AboutHighlight from "../../components/aboutUs/AboutHighlight";
import CoursesHighlight from "../../components/aboutUs/CoursesHighlight";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

export default function Courses() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const {t} = useTranslation();

  const GetStarted = () => {
    navigate('dahua/dahuahd');
  }

  return (
    <Box sx={{ color: "white",  py: 6, px: { xs: 2, md: 10 }, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
      {/* Section: Welcome */}
      <Grid container spacing={6} alignItems="center" justifyContent="center" >
        <Grid item xs={12} md={7}>
          <MotionBox
            sx={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}
            initial={{ x: isSmallScreen ? -300 : -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 1 }}>
              👋 Hello there!
            </Typography>
            <Typography variant={isSmallScreen ? "h4" : "h2"} fontWeight="bold" gutterBottom sx={{ color: isDarkMode ? "white" : "primary.dark" }}>
              Welcome to Extra Smart<br />
              <Typography variant='h3' sx={{ color: isDarkMode ? "primary.light" : "primary.dark", mb: 1 }}>
                {t('Education-Platform')}
              </Typography>
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mt: 2 }}>
            {t('hero_info')}
            </Typography>
          </MotionBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <MotionBox
            initial={{ x: isSmallScreen ? 300 : 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CardMedia
              component="img"
              image={White}
              alt="Engineer"
              sx={{ maxWidth: "500px", height: "auto", borderRadius: 2 }}
            />
          </MotionBox>
        </Grid>
        
      </Grid>

      <Box direction="row" spacing={2} sx={{ mt: 5, ml:8, width:'79%'}}>
        <MotionBox
          initial={{ x: isSmallScreen ? 300 : 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          display="flex"
          gap={2}
          
        >
          <Button variant="contained" color="primary" onClick={GetStarted}>
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            Learn More
          </Button>
        </MotionBox>
      </Box> 
       {/* Section: Highlight */}
      <Box sx={{ 
        mt: 10,
       
      }}>
        <CoursesHighlight />
      </Box>

      {/* Section: Cards */}
      <Box sx={{ 
        width: '100%',
        maxWidth: 'lg',
        mx: 'auto',
        px: 2,
        mt: 15
      }}>
        <Grid 
          container 
          spacing={3}
          justifyContent="center" 
          sx={{
            '& > .MuiGrid-item': {
              flexBasis: { xs: '100%', sm: '50%', md: '33.3%', lg: '25%' }, 
              maxWidth: { xs: '100%', sm: '50%', md: '33.3%', lg: '25%' }
            }
          }}
        >
          <AboutCards />
        </Grid>
      </Box>

      {/* Section: Features */}
      <Stack>
        <FeaturesSection />
      </Stack>
    </Box>
  );
}

import React from "react";
import {
  Box,
  Typography,
  Grid,
  CardMedia,
  useTheme,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import White from "../../assets/location2.png";
import AboutCards from "../../components/aboutUs/AboutCards";
import { useNavigate } from 'react-router-dom';
import FeaturesSection from "../../components/aboutUs/FeaturesSection";
import CoursesHighlight from "../../components/aboutUs/CoursesHighlight";
import { useTranslation } from "react-i18next";

const MotionBox = motion(Box);

export default function Courses() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const { t } = useTranslation();

  const GetStarted = () => {
    navigate('dahua/dahuahd');
  };

  return (
    <Box
      sx={{
        color: "white",
        py: 6,
        px: { xs: 2, md: 10 },
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Section: Welcome */}
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={7}>
          <MotionBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSmallScreen ? 'center' : 'flex-start',
              textAlign: isSmallScreen ? 'center' : 'start',
              px: { xs: 1, sm: 2 },
            }}
            initial={{ x: isSmallScreen ? -300 : -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 1 }}>
              👋 Hello there!
            </Typography>
            <Typography
              variant={isSmallScreen ? "h4" : "h2"}
              fontWeight="bold"
              gutterBottom
              sx={{
                color: isDarkMode ? "white" : "primary.dark",
                textAlign: isSmallScreen ? "center" : "start",
              }}
            >
              Welcome to Extra Smart<br />
              <Typography
                variant={isSmallScreen ? "h4" : "h3"}
                sx={{
                  color: isDarkMode ? "primary.light" : "primary.dark",
                  mb: 1,
                  textAlign: isSmallScreen ? "center" : "start",
                }}
              >
                {t('Education-Platform')}
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mt: 2,
                textAlign: isSmallScreen ? "center" : "start",
              }}
            >
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

      {/* Section: Buttons */}
      <Box
        sx={{
          mt: 5,
          width: '100%',
          display: 'flex',
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          px: { xs: 2, md: 10 },
        }}
      >
        <MotionBox
          initial={{ x: isSmallScreen ? 300 : 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          display="flex"
          flexDirection={isSmallScreen ? "row" : "row"}
          gap={2}
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={GetStarted}>
            {t("Get-Started")}
          </Button>
          <Button variant="outlined" color="primary">
            {t("Learn-More")}
          </Button>
        </MotionBox>
      </Box>

      {/* Section: Highlight */}
      <Box sx={{ mt: 10 }}>
        <CoursesHighlight />
      </Box>

      {/* Section: Cards */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          mx: 'auto',
          px: 2,
          mt: 15,
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{
            '& > .MuiGrid-item': {
              flexBasis: { xs: '100%', sm: '50%', md: '33.3%', lg: '25%' },
              maxWidth: { xs: '100%', sm: '50%', md: '33.3%', lg: '25%' },
            },
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

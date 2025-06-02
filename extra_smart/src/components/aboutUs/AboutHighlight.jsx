// src/components/aboutUs/AboutHighlight.tsx

import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function AboutHighlight() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 8 }, bgcolor: isDarkMode ? "grey.900" : "grey.100" }}>
      <MotionBox
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isSmallScreen ? "h5" : "h4"}
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              Learn. Grow. Succeed.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              At Extra Smart, we believe education is the key to unlocking your potential.
              Our platform connects you with high-quality resources, expert guidance,
              and a community that inspires growth.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                bgcolor: isDarkMode ? "primary.dark" : "primary.light",
                borderRadius: 3,
              }}
            />
          </Grid>
        </Grid>
      </MotionBox>
    </Box>
  );
}

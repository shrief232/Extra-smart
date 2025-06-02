import React from "react";
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const courses = [
  { title: "Dahua HD", icon: "mdi:camera-enhance" },
  { title: "Dahua IP", icon: "mdi:ip" },
  { title: "Imou", icon: "mdi:home-outline" },
  { title: "Intercom", icon: "mdi:doorbell" },
  { title: "Sales Skills", icon: "mdi:handshake" },
];

export default function CoursesHighlight() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 10, textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <MotionBox
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Our Top Courses
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 6,
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Learn with the best. Explore our carefully designed courses to grow your
          skills and boost your career in security and tech.
        </Typography>
      </MotionBox>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          gap: 3,
          px: 1,
          py: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          
        }}
      >
        {courses.map((course, i) => (
          <MotionPaper
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            sx={{
              minWidth: 200,
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              p: 3,
              borderRadius: 4,
              background: isDarkMode ? "#1e1e1e" : "#f9f9f9",
              color: isDarkMode ? "white" : "text.primary",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              boxShadow: isDarkMode
                ? "0 0 10px #000"
                : "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Icon
              icon={course.icon}
              width={40}
              height={40}
              color={theme.palette.primary.main}
            />
            <Typography variant="h6" fontWeight={600}>
              {course.title}
            </Typography>
          </MotionPaper>
        ))}
      </Box>
    </Box>
  );
}

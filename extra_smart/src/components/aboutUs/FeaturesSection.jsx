import {
    Box,
    Typography,
    Grid,
    useTheme,
    Paper,
    useMediaQuery,
  } from "@mui/material";
  import { motion } from "framer-motion";
  import { Icon } from "@iconify/react";
  
  const MotionPaper = motion(Paper);
  
  const features = [
    {
      icon: <Icon icon="mdi:speedometer" fontSize={32} color="#fff" />,
      title: "Real-World Performance",
      description: "Learn how to optimize and implement high-performance CCTV systems in live environments.",
    },
    {
      icon: <Icon icon="ph:devices-bold" fontSize={32} color="#fff" />,
      title: "Cross-Device Skills",
      description: "Master setup and troubleshooting on mobile apps, desktop software, and DVR/NVR systems.",
    },
    {
      icon: <Icon icon="mdi:shield-lock-outline" fontSize={32} color="#fff" />,
      title: "Security & Sales Strategy",
      description: "Understand both system security and how to close sales for retail and large-scale projects.",
    },
  ];
  

  const PaperVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  };
  
  export default function FeaturesSection() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Box
        sx={{
          mt: 10,
          background: isDark
            ? "linear-gradient(to bottom, #121212, #1e1e1e)"
            : "linear-gradient(to bottom, #fafafa, #fff)",
          py: 6,
          px: { xs: 2, md: 8 },
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          sx={{
            mb: 6,
            color: isDark ? "primary.light" : "primary.dark",
          }}
        >
          Platform Features
        </Typography>
  
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <MotionPaper
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.4 }}
                elevation={0}
                variants={PaperVariants}
                sx={{
                  backdropFilter: "blur(12px)",
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.6)",
                  border: "1px solid",
                  borderColor: isDark ? "#333" : "#ddd",
                  borderRadius: 4,
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: isDark
                      ? "primary.main"
                      : "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: isDark ? "#fff" : "text.primary" }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "text.secondary" : "text.secondary" }}
                >
                  {feature.description}
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  
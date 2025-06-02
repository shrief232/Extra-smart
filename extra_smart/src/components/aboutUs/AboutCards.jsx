import React from 'react';
import { Card, CardContent, Typography, Grid, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Info as InfoIcon,
  Flag as MissionIcon,
  Star as WhyUsIcon,
  Favorite as ValuesIcon,
} from '@mui/icons-material';

const icons = [<InfoIcon />, <MissionIcon />, <WhyUsIcon />, <ValuesIcon />];

const cardData = [
  {
    title: "About Us",
    description: "We’re committed to creating value and offering a unique user experience.",
  },
  {
    title: "Our Mission",
    description: "To connect people with opportunities through powerful and simple tools.",
  },
  {
    title: "Why Choose Us",
    description: "Because we blend technology with empathy to deliver solutions that matter.",
  },
  {
    title: "Our Values",
    description: "Integrity, innovation, and impact in everything we do, ensuring excellence.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const AboutCards = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      {cardData.map((card, i) => (
        <Grid 
        item 
        xs={12} 
        sm={6} 
        md={6} 
        lg={3} 
        key={i}
        sx={{ 
          display: 'flex',
          padding: 1, 
          '& > div': { width: '100%' } 
        }}>
          <motion.div
            style={{ height: '100%' }}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <Card
              sx={{
                width: '100%', 
                minWidth: 250, 
                maxWidth: 550, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 4,
                borderRadius: 4,
                background: isDark
                  ? 'rgba(255, 255, 255, 0.04)'
                  : 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: isDark ? '#333' : '#ddd',
                boxShadow: 3,
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                  borderColor: 'primary.main',
                },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  color: '#fff',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                }}
              >
                {icons[i]}
              </Box>
              <CardContent>
                <Typography 
                variant="h6" 
                fontWeight="bold" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold', 
                  gutterBottom: true,
                  minHeight: '3em' 
                }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    color: 'text.secondary',
                    minHeight: '6em',
                  }}
                  >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </>
  );
};

export default AboutCards;

import React from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Controller from "../components/controler/Controller";
import Navbar from "../components/navbar/Navbar";
import { $isAuthorized } from "../atoms/AuthAtom";
import { useRecoilState } from "recoil";
import backgroundImage from '../assets/body.png'
import ScrollToTop from '../components/scroll/ScrollToTop';
import Footer from "../components/footer/Footer";
import MuiAppBar from '@mui/material/AppBar';


const DRAWER_WIDTH = 350;


export default function MainLayout() {
  const [isAuth] = useRecoilState($isAuthorized);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); 
  const scrollContainerRef = React.useRef();
  const [drawerOpen, setDrawerOpen] = React.useState(!isSmallScreen);
 


  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setDrawerOpen(!isSmallScreen);
  }, [isSmallScreen]);

  if (!isAuth?.isRegularAuth) {
    return (
      <Box sx={{
        width: "100%",
        flexGrow: 1, 
        overflowY: 'auto' ,
        '&::-webkit-scrollbar': {
          width: '2px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#f5f5f5',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#a8a8a8',
          }
        },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgb(17, 27, 73) #4568F1', 
        transition: theme => theme.transitions.create('scrollbar-color', {
          duration: 200
        }),
        pr: 1
      
        }}>
        <Navbar onDrawerToggle={handleDrawerToggle}  /> 
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "100vh",     
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        flexGrow: 1, 
        overflowY: 'auto' ,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#f5f5f5',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#c1c1c1',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#a8a8a8',
          }
        },
        scrollbarWidth: 'thin',
        scrollbarColor: theme.palette.mode === 'dark' ?'rgb(94, 71, 133) #000':'rgb(91, 64, 122) #f5f5f5', 
        transition: theme => theme.transitions.create('scrollbar-color', {
          duration: 200
        }),
        pr: 1
      }}
    >
      {isAuth?.isRegularAuth && (
        <Controller open={drawerOpen} onDrawerToggle={handleDrawerToggle} />
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginLeft: {
            xs: 0,
            sm: drawerOpen ? `${DRAWER_WIDTH}px` : `56px`,
          },
          width: {
            xs: "100%",
            sm: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : 56}px)`,
          },
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          
        }}
      >
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <Box ref={scrollContainerRef} sx={{ flexGrow: 1, overflowY: "auto", position: "relative", }}>  
          <Outlet />   
          <Footer /> 
        </Box>
        <ScrollToTop scrollContainerRef={scrollContainerRef} /> 
        
      </Box>   
    </Box>
  );
}

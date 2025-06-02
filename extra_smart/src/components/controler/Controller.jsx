import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
// import AvatarMenu from '../Menu/Menu';
import { IconButton, Collapse } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import AppBar from '@mui/material/AppBar';
import NavLogo from '../logo/NavLogo';



const LOGO_URL = '/assets/logo.png';
const DRAWER_WIDTH = 350;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: open ? DRAWER_WIDTH : `calc(${theme.spacing(7)} + 1px)`,
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
  borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: open 
      ? theme.transitions.duration.enteringScreen
      : theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  whiteSpace: 'nowrap',
}));

const LogoImage = styled('img')({
  width: '140px',
  height: 'auto',
  objectFit: 'contain',
  transition: 'opacity 0.3s',
});

export default function Controller({open, onDrawerToggle, variant}) {
    const theme = useTheme(); 
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedSections, setExpandedSections] = React.useState({});

    const toggleDrawer = () => {
        onDrawerToggle(!open);
    };

  const toggleSection = (segment) => {
    setExpandedSections(prev => ({
      ...prev,
      [segment]: !prev[segment]
    }));
  };

  const isActive = (path) => {
    const currentPath = location.pathname;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const NAVIGATION = [
    { kind: 'header', title: t('Main items') },
    { segment: '', title: t('Courses'), icon: <Icon icon='fluent-mdl2:publish-course' width='24' height='24' /> },
    { 
      segment: 'dahua',
      title: t('Dahua'), 
      icon: <Icon icon='material-symbols:nest-cam-floodlight' width='24' height='24' />, 
      children: [
        { segment: 'dahuahd', title: t('Dahua HD'), icon: <Icon icon='fluent:camera-dome-20-filled' width='20' height='20' />  },
        { segment: 'dahuaip', title: t('Dahua IP'),  icon: <Icon icon='ph:security-camera-fill' width='24' height='24' /> },
      ]
    },
    { kind: 'divider' },
    { kind: 'header', title: t('Consumer & Intercom') },
    { 
        segment: 'imou',
        title: t('IMOU'), 
        icon: <Icon icon='icon-park-twotone:camera-two' width='32' height='32' />, 
        children: [
          { segment: 'imou', title: t('IMOU'), icon: <Icon icon='tdesign:camera-1-filled' width='24' height='24' />, },
          
        ]
      },
      { 
        segment: 'intercom',
        title: t('Intercom'), 
        icon: <Icon icon='icon-park-outline:phone-one' width='24' height='24' />, 
        children: [
          { segment: 'Commax', title: t('Commax'), icon: <Icon icon='simple-icons:intercom' width='24' height='24' />, },
          
        ]
      },
         
    { kind: 'divider' },
    { kind: 'header', title: t('Sales') }, 
    { 
        segment: 'sales',
        title: t('Sales Skills'), 
        icon: <Icon icon="icon-park-twotone:sales-report" width='28' height='28' />, 
        children: [
          { segment: 'presales', title: t('Pre Sales'), icon: <Icon icon='ic:sharp-engineering' width='26' height='26' />  },
          { segment: 'retail', title: t('Retail Sales'), icon: <Icon icon='fluent:building-retail-toolbox-24-regular' width='26' height='26' />  },
        ]
      },
    
    { kind: 'divider' },
    { kind: 'header', title: t('My Progress') },
    { segment: 'assessment', title: t('Assessment'), icon: <Icon icon='raphael:customer' width='28' height='28' />, children: [
        { segment: 'assessment', title: t('My Assessment'), icon: <Icon icon='healthicons:i-certificate-paper' width='28' height='28'/> },
        { segment: 'evaluation', title: t('Evaluation & Suggestions'), icon: <Icon icon='material-symbols:prompt-suggestion' width='28' height='28'/> },
      ]},
    { kind: 'divider' },
    { kind: 'header', title: t('payments') },
    { segment: 'payments', title: t('My Payments'), icon: <Icon icon='fluent:payment-32-filled' width='28' height='28' />, 
        
      },
    
  ];

  const MuiAppBar = styled(AppBar)(({ theme }) => ({
    width: `calc(100% - ${open ? DRAWER_WIDTH : 56}px)`,
    backgroundColor: 'inherit', 
    backdropFilter: 'none', 
    boxShadow: 'none',
    marginLeft: { xs: 0, sm: `${open ? DRAWER_WIDTH : 56}px` },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: open 
        ? theme.transitions.duration.enteringScreen
        : theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      
    },
  }));

  return (
    <>
      
      <Drawer
       variant={variant}
       open={open}>
      <Box
          sx={{
            height: '100%',
            display: { xs: open ? "block" : "none", md: "block" },
            flexDirection: 'column',
            transition: "all 0.3s ease-in-out",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.palette.mode === 'dark' 
            ? '4px 0 10px rgba(23, 6, 95, 0.1)' 
            : '4px 0 10px rgba(0, 0, 0, 0.1)',          
          }}
        >

          <DrawerHeader>
            <Box sx={{ 
              width: '100%',
             px: 2,
             py: 2,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'space-between',
             borderBottom: `1px solid ${theme.palette.divider}`,
            //  backgroundColor: theme.palette.background.default,
              
            }}>
              
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  p: 0.5,
                  backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                  },
                }}
                  >
                    <Icon
                      icon={open ? 'ri:menu-fold-3-line' : 'ri:menu-fold-4-line'}
                      width="24"
                      height="24"
                    />
              </IconButton>
              <Box
                component="img"
                src="./extra-logo.png"
                alt="Logo"
                sx={{
                  width: open ? 70 : 40,
                  height: 'auto',
                  transition: 'all 0.3s ease-in-out',
                  mr: 3,
                  mt: 1,
                }}
                />
            </Box>
          </DrawerHeader>

          <List
           component="nav" 
           sx={{ 
            flexGrow: 1, 
            overflowY: 'auto' ,
            '&::-webkit-scrollbar': {
              width: '2px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#f5f5f5',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#c1c1c1',
              borderRadius: '2px',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2844B5' : '#a8a8a8',
              }
            },
            scrollbarWidth: 'thin',
            scrollbarColor: ' #576CBD #4568F1', 
            transition: theme => theme.transitions.create('scrollbar-color', {
              duration: 100
            }),
            pr: 1

           }}>
            {NAVIGATION.map((item, index) => (
              <React.Fragment key={index}>
                {item.kind === 'divider' ? (
                  <Divider sx={{ my: 1 , borderColor: theme.palette.divider }} />
                ) : item.kind === 'header' ? (
                  <Collapse
                   in={open}
                   orientation="horizontal"
                   sx={{ 
                    maxHeight: open ? '50px' : '0px',
                    overflow: 'hidden',
                    transition: theme => theme.transitions.create(['max-height', 'opacity'], {
                      easing: theme.transitions.easing.sharp,
                      duration: open 
                        ? theme.transitions.duration.enteringScreen
                        : theme.transitions.duration.leavingScreen,
                    }),
                    opacity: open ? 1 : 0,
                   }}
                   >
                    <Box sx={{ 
                      px: 2, 
                      py: 1, 
                      color: theme.palette.text.secondary,
                      typography: 'caption',
                     
                    }}>
                      {item.title}
                    </Box>
                  </Collapse>
                ) : (
                  <Box key={item.segment}>
                    <ListItemButton
                      selected={isActive(`/${item.segment}`)}
                      onClick={() => {
                        if (item.children) {
                          toggleSection(item.segment);
                        } else {
                          navigate(`/${item.segment}`);
                        }
                      }}
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.action.selected, 
                          borderRight: `1px solid ${theme.palette.divider}`,
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.04)',
                        },
                        borderRadius: '0 15px 15px 0',
                        my: 0.5,
                        height: 48,
                      }}
                    >
                      <ListItemIcon sx={{ 
                        minWidth: '40px',
                        color: isActive(`/${item.segment}`) ? theme.palette.primary.main 
                        : theme.palette.text.primary 
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <Collapse
                       in={open} 
                       orientation="horizontal"
                       sx={{
                        overflow: 'hidden',
                        transition: theme => theme.transitions.create(['transform', 'opacity'], {
                          easing: theme.transitions.easing.sharp,
                          duration: open 
                            ? theme.transitions.duration.enteringScreen
                            : theme.transitions.duration.leavingScreen,
                        }),
                        transform: open ? 'translateX(0)' : 'translateX(-100%)',
                        opacity: open ? 1 : 0,
                        width: '100%',
                      }}
                       >
                        <ListItemText 
                          primary={item.title} 
                          sx={{ 
                            opacity: open ? 1 : 0,
                            transition: 'opacity 0.2s ease 0.1s',
                            whiteSpace: 'nowrap',
                            width: open ? 'auto' : 0  
                          }}
                        />
                      </Collapse>
                      {item.children && open && (
                        expandedSections[item.segment] ? <ExpandLess /> : <ExpandMore />
                      )}
                    </ListItemButton>

                    {item.children && (
                      <Collapse 
                        in={expandedSections[item.segment]} 
                        timeout="auto" 
                        unmountOnExit
                      >
                        {item.children.map((child) => (
                          <ListItemButton
                            key={child.segment}
                            selected={isActive(`/${item.segment}/${child.segment}`)}
                            onClick={() => navigate(`/${item.segment}/${child.segment}`)}
                            sx={{
                              pl: 6,
                              height: 40,
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                borderRight: '3px solid #1976d2',
                              },
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                              },
                              borderRadius: '0 2px 24px 0',
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                              {child.icon}
                            </ListItemIcon>
                            <Collapse in={open} orientation="horizontal">
                              <ListItemText 
                                primary={child.title} 
                                sx={{ 
                                  opacity: open ? 1 : 0,
                                  transition: 'opacity 0.3s' 
                                }}
                              />
                            </Collapse>
                          </ListItemButton>
                        ))}
                      </Collapse>
                    )}
                  </Box>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
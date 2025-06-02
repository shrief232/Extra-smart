// NotificationMenu.jsx
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    ListItemText,
    Divider,
    Typography,
    Tooltip,
    Button,
    Box
  } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';
import useRealTimeNotifications from './RealTimeNotifications';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedLessonState } from '../../atoms/LessonState';
import { Icon } from '@iconify/react/dist/iconify.js';

  
  const NotificationMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const setSelectedLesson = useSetRecoilState(selectedLessonState);
    const isLoggedIn = !!localStorage.getItem('access_token');
    // const navigate = useNavigate();
    const { allNotifications, markAsRead, markAllAsRead } = useRealTimeNotifications();
    const unreadCount = allNotifications.filter(n => !n.is_read).length;
  
    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    const handleNotificationClick = (n) => {
      if (!n.is_read) markAsRead(n.id);
      handleClose();
      setSelectedLesson({
        lessonId: n.lesson_id,
        courseType: n.course_type 
      });
      window.location.href = `/${n.course_type}`;
    };
  
    const handleMarkAllAsRead = () => {
      markAllAsRead();
      handleClose();
    };
    if (!isLoggedIn) return null; 
    return (
      <>
        <Tooltip title="Notifications">
          <IconButton onClick={handleOpen} color="inherit">
            <Badge badgeContent={unreadCount} color="error">
              <Icon icon='clarity:notification-line' width={28} height={28} />
            </Badge>
          </IconButton>
        </Tooltip>
  
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
        >
          <Box sx={{ px: 2, pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Notifications</Typography>
            {unreadCount > 0 && (
              <Button size="small" onClick={handleMarkAllAsRead}>
                تمييز الكل كمقروء
              </Button>
            )}
          </Box>
          <Divider />
  
          {allNotifications.length === 0 ? (
            <MenuItem disabled>
              <ListItemText primary="no notification yet " />
            </MenuItem>
          ) : (
            allNotifications.map(n => (
              <MenuItem
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                sx={{ backgroundColor: !n.is_read ? '#000' : 'inherit' }}
              >
                <ListItemText
                  primary={n.message}
                  primaryTypographyProps={{
                    fontWeight: !n.is_read ? 'bold' : 'normal',
                  }}
                />
              </MenuItem>
            ))
          )}
        </Menu>
      </>
    );
  };
  
  export default NotificationMenu;
  
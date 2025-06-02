import React from 'react';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ThemeContext } from '../../context/ThemeContext';

const ToggleButton = () => {
  const { mode, toggleTheme } = React.useContext(ThemeContext);

  return (
    <MenuItem onClick={toggleTheme}>
      <ListItemIcon>
        {mode === 'dark' ? (
          <LightMode fontSize="small" />
        ) : (
          <DarkMode fontSize="small" />
        )}
      </ListItemIcon>
      <Typography variant="body2">
        {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </Typography>
    </MenuItem>
  );
};

export default ToggleButton;
import React from 'react';
import {
  Box,
  Typography,
  Avatar
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme.mode === 'dark';

  const backgroundColor = appTheme.mode === 'dark' ? '#0a1929' : '#f8f9fa';
  const borderColor = appTheme.mode === 'dark' ? '#173a5e' : '#e0e0e0';
  const textColor = appTheme.mode === 'dark' ? '#ffffff' : '#333333';

  return (
    <Box sx={{ 
      p: 3, 
      pb: 2,
      backgroundColor: backgroundColor,
      borderBottom: `1px solid ${borderColor}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }}>
      {/* Right side - User */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" sx={{ 
          color: textColor,
          fontWeight: 500
        }}>
          Hello User
        </Typography>
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
          <PersonIcon />
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header; 
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme
} from '@mui/material';
import { Construction as ConstructionIcon } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import Header from './Header';

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme.mode === 'dark';

  const textColor = isDark ? '#ffffff' : '#333333';
  const secondaryTextColor = isDark ? '#b0b0b0' : '#666666';
  const backgroundColor = isDark ? '#132f4c' : '#ffffff';
  const borderColor = isDark ? '#173a5e' : '#e0e0e0';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: appTheme.mode === 'dark' ? '#0a1929' : '#f8f9fa'
    }}>
      {/* Common Header */}
      <Header />

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        p: 3, 
        pt: 2,
        overflow: 'auto',
        backgroundColor: appTheme.mode === 'dark' ? '#0a1929' : '#f8f9fa',
        minHeight: 0,
        pb: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            maxWidth: 500,
            textAlign: 'center',
            backgroundColor: backgroundColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 3,
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <ConstructionIcon 
            sx={{ 
              fontSize: 80, 
              color: isDark ? '#4fc3f7' : '#1976d2',
              mb: 3
            }} 
          />
          
          <Typography 
            variant="h4" 
            sx={{ 
              color: textColor,
              fontWeight: 700,
              mb: 2
            }}
          >
            Coming Soon
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: secondaryTextColor,
              fontWeight: 500,
              mb: 3
            }}
          >
            {pageName} Page
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: secondaryTextColor,
              lineHeight: 1.6
            }}
          >
            We're working hard to bring you the {pageName.toLowerCase()} functionality. 
            This feature will be available soon with enhanced capabilities and a better user experience.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ComingSoon; 
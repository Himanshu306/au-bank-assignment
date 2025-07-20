import React, { useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ComingSoon from './components/ComingSoon';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState('sales-overview');

  const muiTheme = createTheme({
    palette: {
      mode: theme.mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: theme.mode === 'dark' ? '#0a1929' : '#f8f9fa',
        paper: theme.mode === 'dark' ? '#132f4c' : '#ffffff',
      },
      text: {
        primary: theme.mode === 'dark' ? '#ffffff' : '#333333',
        secondary: theme.mode === 'dark' ? '#b0b0b0' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: theme.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: 8,
            backgroundColor: theme.mode === 'dark' ? '#132f4c' : '#ffffff',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 6,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: theme.mode === 'dark' ? '#132f4c' : '#f8f9fa',
            borderRight: `1px solid ${theme.mode === 'dark' ? '#173a5e' : '#e0e0e0'}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: theme.mode === 'dark' ? '#132f4c' : '#ffffff',
            boxShadow: theme.mode === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  const sidebarWidth = 220;
  const collapsedWidth = 64;

  // Function to render the appropriate content based on selected menu item
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'sales-overview':
        return <Dashboard />;
      case 'stores':
        return <ComingSoon pageName="Stores" />;
      case 'notifications':
        return <ComingSoon pageName="Notifications" />;
      case 'settings':
        return <ComingSoon pageName="Settings" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        height: '100vh', 
        backgroundColor: theme.mode === 'dark' ? '#0a1929' : '#f8f9fa',
        overflow: 'hidden'
      }}>
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          selectedItem={selectedMenuItem}
          onItemSelect={setSelectedMenuItem}
        />
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0, // Prevent flex item from overflowing
          overflow: 'hidden',
          ml: { xs: 0, md: 0 }, // No left margin on desktop
          width: { 
            md: sidebarOpen 
              ? `calc(100% - ${sidebarWidth}px)` 
              : `calc(100% - ${collapsedWidth}px)` 
          },
          transition: 'width 0.3s ease'
        }}>
          {renderContent()}
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  selectedItem: string;
  onItemSelect: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, selectedItem, onItemSelect }) => {
  const theme = useTheme();
  const { theme: appTheme, toggleTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerWidth = 220;
  const collapsedWidth = 64;

  const menuItems = [
    { id: 'sales-overview', label: 'Sales Overview', icon: <DashboardIcon /> },
    { id: 'stores', label: 'Stores', icon: <StoreIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    { 
      id: 'theme-toggle', 
      label: appTheme.mode === 'dark' ? 'Dark Theme' : 'Light Theme', 
      icon: appTheme.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />,
      isThemeToggle: true
    }
  ];

  const backgroundColor = appTheme.mode === 'dark' ? '#132f4c' : '#f8f9fa';
  const textColor = appTheme.mode === 'dark' ? '#ffffff' : '#333333';
  const borderColor = appTheme.mode === 'dark' ? '#173a5e' : '#e0e0e0';
  const hoverColor = appTheme.mode === 'dark' ? '#173a5e' : '#f5f5f5';

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: backgroundColor,
      color: textColor
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: appTheme.mode === 'dark' ? '#0a1929' : '#ffffff',
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'space-between' : 'center'
      }}>
        {open ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                onClick={onToggle}
                sx={{ 
                  color: textColor,
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: hoverColor,
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: textColor,
                fontSize: '1.1rem'
              }}>
                Sales Dashboard
              </Typography>
            </Box>
          </>
        ) : (
          <IconButton 
            onClick={onToggle}
            sx={{ 
              color: textColor,
              p: 0.5,
              '&:hover': {
                backgroundColor: hoverColor,
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <Tooltip 
              title={open ? '' : item.label} 
              placement="right"
              disableHoverListener={open}
            >
              <ListItemButton
                onClick={() => {
                  if (item.isThemeToggle) {
                    toggleTheme();
                  } else {
                    onItemSelect(item.id);
                  }
                }}
                selected={!item.isThemeToggle && selectedItem === item.id}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  minHeight: 48,
                  justifyContent: open ? 'flex-start' : 'center',
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#1976d2',
                    },
                  },
                  '&:hover': {
                    backgroundColor: hoverColor,
                  },
                  py: 1.5,
                  px: open ? 2 : 1,
                }}
              >
                <ListItemIcon sx={{ 
                  color: (!item.isThemeToggle && selectedItem === item.id) ? '#ffffff' : (appTheme.mode === 'dark' ? '#b0b0b0' : '#666666'),
                  minWidth: open ? 36 : 'auto',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText 
                    primary={item.label} 
                    sx={{ 
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                        fontWeight: (!item.isThemeToggle && selectedItem === item.id) ? 600 : 400,
                        color: (!item.isThemeToggle && selectedItem === item.id) ? '#ffffff' : textColor
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: backgroundColor,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            transition: 'width 0.3s ease',
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedWidth,
              boxSizing: 'border-box',
              backgroundColor: backgroundColor,
              borderRight: `1px solid ${borderColor}`,
              transition: 'width 0.3s ease',
              overflowX: 'hidden'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar; 
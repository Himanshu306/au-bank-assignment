import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme
} from '@mui/material';
import {
  AttachMoneyOutlined as MoneyIcon,
  BarChartOutlined as BarChartIcon,
  BalanceOutlined as ScaleIcon,
  PointOfSaleOutlined as AtmIcon
} from '@mui/icons-material';
import { DashboardData } from '../types';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import { CurrencyRupee as RupeeIcon } from '@mui/icons-material';

interface KPICardsProps {
  data: DashboardData;
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme.mode === 'dark';

  const kpiData = [
    {
      title: 'Total Sales',
      value: `$${data.totalSales.toLocaleString()}`,
      icon: <RupeeIcon />,
      // bgColor: '#4caf50', // Green circle background
      iconColor: '#4caf50' // White icon
    },
    {
      title: 'Quantity Sold',
      value: data.quantitySold.toLocaleString(),
      icon: <BarChartIcon />,
      // bgColor: '#2196f3', // Blue circle background
      iconColor: '#2196f3' // White icon
    },
    {
      title: 'Discount%',
      value: `${data.discountPercentage.toFixed(1)}%`,
      icon: <ScaleIcon />,
      // bgColor: '#ff9800', // Orange circle background
      iconColor: '#ff9800' // White icon
    },
    {
      title: 'Profit',
      value: `$${data.profit.toLocaleString()}`,
      icon: <AtmIcon />,
      // bgColor: '#f44336', // Red circle background
      iconColor: '#f44336' // White icon
    }
  ];

  const textColor = isDark ? '#ffffff' : '#333333';
  const cardBgColor = isDark ? '#132f4c' : '#ffffff';
  const borderColor = isDark ? '#173a5e' : '#e0e0e0';

  return (
    <Box sx={{ 
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
      gap: 3,
      width: '100%'
    }}>
      {kpiData.map((kpi, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: cardBgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
            boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)',
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              mb: 2
            }}>
              {/* Icon with colored circular background */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                // backgroundColor: kpi.bgColor,
                border: `2px solid ${kpi.iconColor}`,
                color: kpi.iconColor,
                flexShrink: 0,
                // boxShadow: `0 2px 8px ${kpi.bgColor}40`
              }}>
                {React.cloneElement(kpi.icon, { 
                  sx: { fontSize: 24 }
                })}
              </Box>
              
              {/* Title and Value */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ 
                  color: isDark ? '#b0b0b0' : '#666666',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  mb: 0.5
                }}>
                  {kpi.title}
                </Typography>

                <Typography variant="h4" sx={{ 
                  color: textColor,
                  fontWeight: 700,
                  fontSize: '1.75rem',
                  lineHeight: 1.2
                }}>
                  {kpi.value}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default KPICards; 
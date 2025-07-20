import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import { DashboardData } from '../types';

interface TablesProps {
  data: DashboardData;
}

const Tables: React.FC<TablesProps> = ({ data }) => {
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme.mode === 'dark';

  const textColor = isDark ? '#ffffff' : '#333333';
  const secondaryTextColor = isDark ? '#b0b0b0' : '#666666';
  const borderColor = isDark ? '#173a5e' : '#e0e0e0';
  const backgroundColor = isDark ? '#132f4c' : '#ffffff';
  const barColor = '#4fc3f7'; // Light blue color from screenshot

  // Get the top 10 products by sales
  const topProducts = data.salesByProducts
    .sort((a: any, b: any) => b.sales - a.sales)
    .slice(0, 10);

  const maxSales = Math.max(...topProducts.map((p: any) => p.sales));
  const hasData = topProducts.length > 0 && maxSales > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: textColor,
          fontWeight: 600,
          fontSize: '1rem'
        }}
      >
        Sales by Products
      </Typography>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {hasData ? (
          <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: textColor,
                      fontWeight: 600,
                      backgroundColor: backgroundColor,
                      borderBottom: `1px solid ${borderColor}`,
                      fontSize: '0.875rem'
                    }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: textColor,
                      fontWeight: 600,
                      backgroundColor: backgroundColor,
                      borderBottom: `1px solid ${borderColor}`,
                      fontSize: '0.875rem'
                    }}
                  >
                    Sales in $
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:hover': {
                        backgroundColor: isDark ? '#173a5e' : '#f5f5f5'
                      }
                    }}
                  >
                    <TableCell
                      sx={{
                        color: textColor,
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '0.8rem',
                        py: 1.5,
                        maxWidth: '200px'
                      }}
                    >
                      <Tooltip 
                        title={product.productName}
                        placement="top"
                        arrow
                        sx={{
                          '& .MuiTooltip-tooltip': {
                            backgroundColor: isDark ? '#173a5e' : '#333333',
                            color: isDark ? '#ffffff' : '#ffffff',
                            fontSize: '0.75rem',
                            maxWidth: '300px'
                          }
                        }}
                      >
                        <Box sx={{ 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer'
                        }}>
                          {product.productName}
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: textColor,
                        borderBottom: `1px solid ${borderColor}`,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        py: 1.5,
                        minWidth: '120px'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(product.sales / maxSales) * 100}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: isDark ? '#173a5e' : '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: barColor,
                                borderRadius: 4
                              }
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: textColor,
                            fontWeight: 500,
                            minWidth: '60px',
                            textAlign: 'right'
                          }}
                        >
                          ${product.sales.toLocaleString()}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: isDark ? '#b0b0b0' : '#666666',
                fontWeight: 500
              }}
            >
              No data found
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDark ? '#888888' : '#999999',
                textAlign: 'center'
              }}
            >
              No product sales data available for the selected criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Tables; 
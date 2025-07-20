import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { DashboardData } from '../types';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface ChartsProps {
  data: DashboardData;
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();

  // Prepare data for the chart
  const chartData = data.salesByCity.map(item => ({
    name: item.city,
    value: item.sales
  }));

  const isDark = appTheme.mode === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const axisColor = isDark ? '#b0b0b0' : '#666666';
  const barColor = '#4fc3f7'; // Light blue color from screenshot
  const backgroundColor = isDark ? '#132f4c' : '#ffffff';

  // Check if there's data to display
  const hasData = chartData.length > 0 && chartData.some(item => item.value > 0);

  const option = {
    title: {
      text: 'Sales by City',
      left: 'left',
      textStyle: {
        color: textColor,
        fontSize: 16,
        fontWeight: 600
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function(params: any) {
        return `${params[0].name}: $${params[0].value.toLocaleString()}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: axisColor
        }
      },
      axisTick: {
        lineStyle: {
          color: axisColor
        }
      },
      axisLabel: {
        color: axisColor,
        formatter: function(value: number) {
          return '$' + value.toLocaleString();
        }
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#173a5e' : '#e0e0e0',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: chartData.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: axisColor
        }
      },
      axisTick: {
        lineStyle: {
          color: axisColor
        }
      },
      axisLabel: {
        color: axisColor,
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: chartData.map(item => item.value),
        itemStyle: {
          color: barColor,
          borderRadius: [0, 4, 4, 0]
        },
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            color: '#29b6f6'
          }
        }
      }
    ]
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        backgroundColor: backgroundColor,
        border: `1px solid ${isDark ? '#173a5e' : '#e0e0e0'}`,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {hasData ? (
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
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
              No sales data available for the selected criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Charts; 
import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';
import { DashboardData } from '../types';

interface SegmentChartProps {
  data: DashboardData;
}

const SegmentChart: React.FC<SegmentChartProps> = ({ data }) => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();
  const isDark = appTheme.mode === 'dark';

  const textColor = isDark ? '#ffffff' : '#333333';
  const backgroundColor = isDark ? '#132f4c' : '#ffffff';

  // Use actual data from API
  const chartData = data.salesBySegment.map(item => ({
    name: item.segment,
    value: item.sales
  }));

  const hasData = chartData.length > 0 && chartData.some(item => item.value > 0);

  const option = {
    title: {
      text: 'Sales By Segment',
      left: 'left',
      textStyle: {
        color: textColor,
        fontSize: 16,
        fontWeight: 600
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ${c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: '10%',
      textStyle: {
        color: textColor,
        fontSize: 11
      }
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderWidth: 0,
          borderRadius: 0
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            color: textColor
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: chartData.find(item => item.name === 'Consumer')?.value || 0, 
            name: 'Consumer', 
            itemStyle: { 
              color: '#2196f3',
              borderWidth: 0,
              borderRadius: 0
            }
          },
          { 
            value: chartData.find(item => item.name === 'Corporate')?.value || 0, 
            name: 'Corporate', 
            itemStyle: { 
              color: '#ff9800',
              borderWidth: 0,
              borderRadius: 0
            }
          },
          { 
            value: chartData.find(item => item.name === 'Home Office')?.value || 0, 
            name: 'Home Office', 
            itemStyle: { 
              color: '#f44336',
              borderWidth: 0,
              borderRadius: 0
            }
          }
        ]
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
              No segment sales data available for the selected criteria
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default SegmentChart; 
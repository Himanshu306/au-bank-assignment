import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import { apiService } from '../services/api';
import { DashboardData } from '../types';
import Header from './Header';
import Filters from './Filters';
import KPICards from './KPICards';
import Charts from './Charts';
import Tables from './Tables';
import DonutCharts from './DonutCharts';
import SubCategoryTable from './SubCategoryTable';
import SegmentChart from './SegmentChart';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedState, setSelectedState] = useState('Alabama');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [fromDate, setFromDate] = useState('2014-01-03');
  const [toDate, setToDate] = useState('2017-12-30');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (fromDate && toDate) {
        setLoading(true);
        setError('');
        try {
          const data = await apiService.getDashboardData(
            selectedState, 
            fromDate, 
            toDate,
            selectedCustomerId || undefined
          );
          setDashboardData(data);
        } catch (err) {
          setError('Failed to fetch dashboard data');
          console.error('Error fetching dashboard data:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [selectedState, selectedCustomerId, fromDate, toDate]);

  const backgroundColor = appTheme.mode === 'dark' ? '#0a1929' : '#f8f9fa';
  const borderColor = appTheme.mode === 'dark' ? '#173a5e' : '#e0e0e0';
  const textColor = appTheme.mode === 'dark' ? '#ffffff' : '#333333';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: backgroundColor
    }}>
      {/* Common Header */}
      <Header />

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        p: 3, 
        pt: 2,
        overflow: 'auto',
        backgroundColor: backgroundColor,
        minHeight: 0,
        pb: 6,
      }}>
        {/* Sales Overview Title and Filters */}
        <Box sx={{ 
          mb: 4,
          display: 'flex',
          // flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2
        }}>
          {/* Title */}
          <Typography variant="h4" sx={{ 
            color: textColor, 
            fontWeight: 700,
            fontSize: '1.5rem'
          }}>
            Sales Overview
          </Typography>

          {/* Filters */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Filters
              selectedState={selectedState}
              onStateChange={setSelectedState}
              selectedCustomerId={selectedCustomerId}
              onCustomerIdChange={setSelectedCustomerId}
              fromDate={fromDate}
              onFromDateChange={setFromDate}
              toDate={toDate}
              onToDateChange={setToDate}
            />
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Dashboard Content */}
        {dashboardData && !loading && (
          <>
            {/* KPI Cards */}
            <Box sx={{ mb: 4 }}>
              <KPICards data={dashboardData} />
            </Box>

            {/* Top Row: Sales by City Chart and Sales by Products Table */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
              gap: 3,
              mb: 3,
              width: '100%',
              height: { lg: '400px' }
            }}>
              {/* Top Left: Sales by City Chart */}
              <Box sx={{ minHeight: 0 }}>
                <Charts data={dashboardData} />
              </Box>
              
              {/* Top Right: Sales by Products Table */}
              <Box sx={{ minHeight: 0 }}>
                <Tables data={dashboardData} />
              </Box>
            </Box>

            {/* Bottom Row: Three Elements */}
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
              gap: 3,
              width: '100%',
              height: { lg: '400px' }
            }}>
              {/* Bottom Left: Sales by Category Donut Chart */}
              <Box sx={{ minHeight: 0 }}>
                <DonutCharts data={dashboardData} />
              </Box>

              {/* Bottom Middle: Sales by Sub Category Table */}
              <Box sx={{ minHeight: 0 }}>
                <SubCategoryTable data={dashboardData} />
              </Box>

              {/* Bottom Right: Sales by Segment Donut Chart */}
              <Box sx={{ minHeight: 0 }}>
                <SegmentChart data={dashboardData} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard; 
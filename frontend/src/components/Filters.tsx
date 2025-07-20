import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { apiService } from '../services/api';
import { useTheme as useAppTheme } from '../contexts/ThemeContext';

interface FiltersProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedCustomerId: string;
  onCustomerIdChange: (customerId: string) => void;
  fromDate: string;
  onFromDateChange: (date: string) => void;
  toDate: string;
  onToDateChange: (date: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedState,
  onStateChange,
  selectedCustomerId,
  onCustomerIdChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange
}) => {
  const theme = useTheme();
  const { theme: appTheme } = useAppTheme();
  const [states, setStates] = useState<string[]>([]);
  const [customerIds, setCustomerIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const isDark = appTheme.mode === 'dark';
  const textColor = isDark ? '#ffffff' : '#333333';
  const borderColor = isDark ? '#173a5e' : '#e0e0e0';
  const backgroundColor = isDark ? '#132f4c' : '#ffffff';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statesData, customerIdsData] = await Promise.all([
          apiService.getStates(),
          apiService.getCustomerIds()
        ]);
        setStates(statesData);
        setCustomerIds(customerIdsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* State Filter */}
        <Box sx={{ minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              color: textColor,
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            Select a state
          </Typography>
          <Autocomplete
            value={selectedState}
            onChange={(event, newValue) => {
              onStateChange(newValue || '');
            }}
            options={states}
            loading={loading}
            disableClearable
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: isDark ? '#4fc3f7' : '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputBase-input': {
                color: textColor,
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: isDark ? '#b0b0b0' : '#666666',
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search states..."
                sx={{
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                }}
              />
            )}
            ListboxProps={{
              sx: {
                backgroundColor: backgroundColor,
                '& .MuiAutocomplete-option': {
                  color: textColor,
                  '&:hover': {
                    backgroundColor: isDark ? '#173a5e' : '#f5f5f5',
                  },
                  '&.Mui-focused': {
                    backgroundColor: isDark ? '#173a5e' : '#f5f5f5',
                  },
                },
              },
            }}
          />
        </Box>

        {/* Customer ID Filter */}
        <Box sx={{ minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              color: textColor,
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            Select Customer ID
          </Typography>
          <Autocomplete
            value={selectedCustomerId}
            onChange={(event, newValue) => {
              onCustomerIdChange(newValue || '');
            }}
            options={['', ...customerIds]}
            loading={loading}
            disableClearable
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                '& fieldset': {
                  borderColor: borderColor,
                },
                '&:hover fieldset': {
                  borderColor: isDark ? '#4fc3f7' : '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
              '& .MuiInputBase-input': {
                color: textColor,
              },
              '& .MuiAutocomplete-popupIndicator': {
                color: isDark ? '#b0b0b0' : '#666666',
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search customer IDs..."
                sx={{
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                {option === '' ? 'All Customers' : option}
              </li>
            )}
            ListboxProps={{
              sx: {
                backgroundColor: backgroundColor,
                '& .MuiAutocomplete-option': {
                  color: textColor,
                  '&:hover': {
                    backgroundColor: isDark ? '#173a5e' : '#f5f5f5',
                  },
                  '&.Mui-focused': {
                    backgroundColor: isDark ? '#173a5e' : '#f5f5f5',
                  },
                },
              },
            }}
          />
        </Box>

        {/* From Date Filter */}
        <Box sx={{ minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              color: textColor,
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            Select From date
          </Typography>
          <DatePicker
            value={new Date(fromDate)}
            onChange={(newValue) => {
              if (newValue) {
                onFromDateChange(newValue.toISOString().split('T')[0]);
              }
            }}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    '& fieldset': {
                      borderColor: borderColor,
                    },
                    '&:hover fieldset': {
                      borderColor: isDark ? '#4fc3f7' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDark ? '#b0b0b0' : '#666666',
                    '&.Mui-focused': {
                      color: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                }
              }
            }}
          />
        </Box>

        {/* To Date Filter */}
        <Box sx={{ minWidth: 200 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 1, 
              color: textColor,
              fontWeight: 500,
              fontSize: '0.875rem'
            }}
          >
            Select To date
          </Typography>
          <DatePicker
            value={new Date(toDate)}
            onChange={(newValue) => {
              if (newValue) {
                onToDateChange(newValue.toISOString().split('T')[0]);
              }
            }}
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    '& fieldset': {
                      borderColor: borderColor,
                    },
                    '&:hover fieldset': {
                      borderColor: isDark ? '#4fc3f7' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDark ? '#b0b0b0' : '#666666',
                    '&.Mui-focused': {
                      color: '#1976d2',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: textColor,
                  },
                }
              }
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Filters; 
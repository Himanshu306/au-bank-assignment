import axios from 'axios';
import { DashboardData, DateRange } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Get all states
  getStates: async (): Promise<string[]> => {
    const response = await api.get('/states');
    return response.data;
  },

  // Get all customer IDs
  getCustomerIds: async (): Promise<string[]> => {
    const response = await api.get('/customer-ids');
    return response.data;
  },

  // Get date range for a specific state
  getDateRange: async (state: string): Promise<DateRange> => {
    const response = await api.get(`/date-range/${encodeURIComponent(state)}`);
    return response.data;
  },

  // Get date range for a specific customer ID
  getDateRangeForCustomer: async (customerId: string): Promise<DateRange> => {
    const response = await api.get(`/date-range-customer/${encodeURIComponent(customerId)}`);
    return response.data;
  },

  // Get dashboard data
  getDashboardData: async (
    state: string, 
    fromDate: string, 
    toDate: string,
    customerId?: string
  ): Promise<DashboardData> => {
    const response = await api.get('/dashboard-data', {
      params: { state, fromDate, toDate, customerId }
    });
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
}; 
import express from 'express';
import cors from 'cors';
import { DataService } from './dataService';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data service
const dataService = new DataService();

// API Routes

// Get all states
app.get('/api/states', (req, res) => {
  try {
    const states = dataService.getStates();
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch states' });
  }
});

// Get all customer IDs
app.get('/api/customer-ids', (req, res) => {
  try {
    const customerIds = dataService.getCustomerIds();
    res.json(customerIds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer IDs' });
  }
});

// Get date range for a specific state
app.get('/api/date-range/:state', (req, res) => {
  try {
    const { state } = req.params;
    const dateRange = dataService.getDateRangeForState(state);
    res.json(dateRange);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch date range' });
  }
});

// Get date range for a specific customer ID
app.get('/api/date-range-customer/:customerId', (req, res) => {
  try {
    const { customerId } = req.params;
    const dateRange = dataService.getDateRangeForCustomer(customerId);
    res.json(dateRange);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch date range for customer' });
  }
});

// Get dashboard data
app.get('/api/dashboard-data', (req, res) => {
  try {
    const { state, fromDate, toDate, customerId } = req.query;
    
    if (!state || !fromDate || !toDate) {
      return res.status(400).json({ 
        error: 'Missing required parameters: state, fromDate, toDate' 
      });
    }

    const dashboardData = dataService.getDashboardData(
      state as string, 
      fromDate as string, 
      toDate as string,
      customerId as string
    );
    
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Sales Dashboard API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
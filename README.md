# Sales Dashboard Application

A modern sales dashboard application built with React (TypeScript) frontend and Node.js backend, featuring real-time data visualization and interactive filtering capabilities.

## Features

### Frontend (React + TypeScript)
- **Modern UI**: Built with Material-UI components for a professional look
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Charts**: Beautiful data visualizations using ECharts
- **Real-time Filtering**: Filter data by state, customer ID, and date range
- **KPI Cards**: Display key performance indicators
- **Data Tables**: Detailed product and category sales data
- **Collapsible Sidebar**: Expandable navigation menu

### Backend (Node.js + TypeScript)
- **RESTful APIs**: Clean and well-structured API endpoints
- **Data Processing**: Efficient data aggregation and filtering
- **TypeScript**: Full type safety for better code quality
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

## Project Structure

```
au-bank/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Main server file
│   │   ├── dataService.ts     # Data processing logic
│   │   └── types.ts           # TypeScript interfaces
│   ├── sales.json             # Sales data source
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── contexts/          # React contexts
│   │   ├── services/          # API services
│   │   ├── types/             # TypeScript interfaces
│   │   └── App.tsx           # Main app component
│   └── package.json
└── README.md
```

## API Endpoints

### Backend APIs
- `GET /api/states` - Get list of available states
- `GET /api/customer-ids` - Get list of available customer IDs
- `GET /api/date-range/:state` - Get date range for a specific state
- `GET /api/date-range-customer/:customerId` - Get date range for a specific customer
- `GET /api/dashboard-data` - Get dashboard data with filters (state, customer ID, date range)
- `GET /api/health` - Health check endpoint

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

## Usage

1. **Start both servers** (backend and frontend)
2. **Open the application** in your browser at `http://localhost:3000`
3. **Select a state** from the dropdown (defaults to first state)
4. **Select a customer ID** (optional - "All Customers" for all data)
5. **Choose date range** using the date pickers
6. **View the dashboard** with updated data
7. **Toggle theme** using the sidebar theme switch
8. **Navigate** using the sidebar menu

## Features Implemented

### Required Tasks ✅
- [x] Create dashboard from Figma design using ReactJS
- [x] State selection dropdown with API integration
- [x] Date range selection with min/max date binding
- [x] Backend API for states list
- [x] Backend API for date range per state

### Bonus Tasks ✅
- [x] Real-time data fetching and binding to charts/cards
- [x] Expandable/collapsible sidebar navigation
- [x] Light/Dark theme switching
- [x] Responsive design for all device widths
- [x] TypeScript implementation for both frontend and backend
- [x] Dashboard data API with filtering
- [x] Customer ID filtering (additional bonus feature)

## Technologies Used

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- ECharts for React
- Axios for API calls

### Backend
- Node.js
- Express.js
- TypeScript
- CORS middleware

## Data Source
The application uses a `sales.json` file containing sales data with the following structure:
- Order information (ID, dates, customer details)
- Product information (category, sub-category, name)
- Sales metrics (sales amount, quantity, discount, profit)
- Geographic data (state, city, region)

## Development

### Backend Development
```bash
cd backend
npm run dev    # Start development server with hot reload
npm run build  # Build for production
npm start      # Start production server
```

### Frontend Development
```bash
cd frontend
npm start      # Start development server
npm run build  # Build for production
npm test       # Run tests
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 
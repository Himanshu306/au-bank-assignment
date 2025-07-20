# Sales Dashboard Application

A modern sales dashboard application built with React (TypeScript) frontend and Node.js backend, featuring real-time data visualization and interactive filtering capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Option 1: Start Both Servers Together (Recommended)
```bash
# Clone the repository
git clone https://github.com/Himanshu306/au-bank-assignment.git
cd au-bank-assignment

# Install dependencies for both frontend and backend
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..

# Start both servers together and after installing all dependancy run the .sh(script file) which will run both backend and frontend
./start.sh
```

This will start:
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:3000`


## 🏗️ Project Structure

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
├── start.sh                   # Script to start both servers
└── README.md
```
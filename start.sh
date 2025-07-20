#!/bin/bash

echo "Starting Sales Dashboard Application..."

# Start backend in background
echo "Starting backend server..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend server..."
cd frontend && npm start &
FRONTEND_PID=$!

echo "Both servers are starting..."
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Cleanup
echo "Stopping servers..."
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
echo "Servers stopped." 
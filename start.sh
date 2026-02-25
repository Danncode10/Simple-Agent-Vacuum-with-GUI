#!/bin/bash

echo "Setting up Vacuum Cleaner Agent Simulation..."

# Install Python dependencies
echo "Installing Python dependencies..."
cd python-backend
pip install -r requirements.txt

# Start backend server in background
echo "Starting backend server..."
python server.py &
BACKEND_PID=$!

# Go back to root
cd ..

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
cd nextjs-frontend
npm install

# Start frontend
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Go back to root
cd ..

echo "Setup complete!"
echo "Backend running on http://127.0.0.1:5001"
echo "Frontend running on http://localhost:3000"
echo "API docs available at http://127.0.0.1:5001/docs"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
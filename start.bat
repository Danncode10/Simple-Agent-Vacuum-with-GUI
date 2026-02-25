@echo off
echo Setting up Vacuum Cleaner Agent Simulation...

REM Install Python dependencies
echo Installing Python dependencies...
cd python-backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install Python dependencies
    pause
    exit /b 1
)

REM Start backend server in background
echo Starting backend server...
start /B python server.py
if %errorlevel% neq 0 (
    echo Failed to start backend server
    pause
    exit /b 1
)

REM Go back to root
cd ..

REM Install Node.js dependencies
echo Installing Node.js dependencies...
cd nextjs-frontend
npm install
if %errorlevel% neq 0 (
    echo Failed to install Node.js dependencies
    pause
    exit /b 1
)

REM Start frontend
echo Starting frontend...
start /B npm run dev
if %errorlevel% neq 0 (
    echo Failed to start frontend
    pause
    exit /b 1
)

REM Go back to root
cd ..

echo Setup complete!
echo Backend running on http://127.0.0.1:5001
echo Frontend running on http://localhost:3000
echo API docs available at http://127.0.0.1:5001/docs
echo.
echo Press any key to exit (servers will continue running)...
pause > nul
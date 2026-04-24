@echo off
REM Webbio Project Setup Script for Windows

echo ====================================
echo Webbio - Full Stack Setup
echo ====================================
echo.

echo [1/3] Installing backend dependencies...
cd backend
call npm install

if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/3] Backend setup complete!
echo.
echo [3/3] Starting backend server...
echo.
echo ✓ Server will start in a few seconds...
echo ✓ Open your browser to http://localhost:5000
echo.

npm start

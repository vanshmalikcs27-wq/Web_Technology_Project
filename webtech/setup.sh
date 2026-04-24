#!/bin/bash

# Webbio Project Setup Script for Mac/Linux

echo "===================================="
echo "Webbio - Full Stack Setup"
echo "===================================="
echo ""

echo "[1/3] Installing backend dependencies..."
cd backend
npm install

if [ $? -ne 0 ]; then
    echo "Failed to install dependencies"
    exit 1
fi

echo ""
echo "[2/3] Backend setup complete!"
echo ""
echo "[3/3] Starting backend server..."
echo ""
echo "✓ Server will start in a few seconds..."
echo "✓ Open your browser to http://localhost:5000"
echo ""

npm start

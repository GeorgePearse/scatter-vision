#!/bin/bash

# Start the backend FastAPI server in the background
cd backend && uvicorn main:app --reload --port 8000 &

# Start the frontend Vite dev server in the background
npm run dev &

# Keep the script running and capture Ctrl+C
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
wait

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # WARNING: Don't use this in production without proper configuration
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint for basic health check"""
    return {"status": "ok", "message": "API is running"}

# Generate some random points for visualization
num_points = 10000
points_2d = np.random.uniform(-1, 1, (num_points, 2))

@app.get("/api/points")
async def get_points():
    logger.info("Endpoint /api/points was hit!")
    return {"points": points_2d.tolist()}

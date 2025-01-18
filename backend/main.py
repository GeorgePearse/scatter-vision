from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/points")
async def get_points():
    # Generate random points
    num_points = 10000
    points = np.random.uniform(-1, 1, (num_points, 2)).tolist()
    return {"points": points}

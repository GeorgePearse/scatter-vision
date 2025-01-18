from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import logging
from datetime import datetime
from torchvision import datasets, transforms
from docarray import Document, DocumentArray
import umap
import torch

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
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and process MNIST once at startup
mnist_train = datasets.MNIST(root='./data', train=True, download=True, transform=transforms.ToTensor())

# Convert to DocumentArray and generate embeddings
docs = DocumentArray()
for img, label in mnist_train:
    # Flatten image and convert to numpy
    img_flat = img.numpy().flatten()
    doc = Document(tensor=img_flat)
    docs.append(doc)

# Generate embeddings using Jina
docs.embed(model_name='jinaai/jina-embeddings-v2-base-en', device='cpu')

# Get embeddings as numpy array
embeddings = np.stack(docs.embeddings)

# Reduce dimensionality with UMAP
reducer = umap.UMAP(n_components=2, random_state=42)
points_2d = reducer.fit_transform(embeddings)

# Scale points to [-1, 1] range
points_2d = 2 * (points_2d - points_2d.min()) / (points_2d.max() - points_2d.min()) - 1

@app.get("/api/points")
async def get_points():
    logger.info("Endpoint /api/points was hit!")
    return {"points": points_2d.tolist()}

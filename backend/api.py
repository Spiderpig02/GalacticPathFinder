from loguru import logger
import uvicorn
from fastapi import FastAPI

from src.algorithms.path_service import find_path
from src.factory import get_graph_traversal_methods, get_heuristics
from src.models import GraphTraversalRequest, GraphTraversalResponse, GraphHeuristicsRequest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
        title="Galactic Path Finder API",
        description = "An API for finding the shortest path between two points on a grid using various graph traversal algorithms.",
        version = "1.0.0",
    )

origins = [
    "http://localhost:3000",  # React default port
    "http://localhost:5173",  # Vite default port
    "https://galacticpathfinder.com",
    "https://www.galacticpathfinder.com",
    "http://127.0.0.1",
    ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/graphtraversal/traverse", response_model=GraphTraversalResponse)
def post_graph_traversal(request: GraphTraversalRequest):
    logger.info(f"Received graph traversal request: {request}")
    return find_path(request)
    

@app.get("/graphtraversal/graph-traversal-methods", response_model=list[str])
def fetch_graph_traversal_methods():
    return get_graph_traversal_methods()

@app.post("/graphtraversal/graph-heuristics-methods", response_model=list[str])
def fetch_graph_heuristics(request: GraphHeuristicsRequest):
    logger.info(f"Received graph heuristics request: {request}")
    method = request.method
    heuristics = get_heuristics(method)
    return heuristics



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

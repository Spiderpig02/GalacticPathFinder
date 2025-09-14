from fastapi import FastAPI, HTTPException
from fastapi import status
from datetime import datetime

import uvicorn
from src.factory import get_pathfinder, get_graph_traversal_methods, get_heuristics, get_heuristic_function
from src.map import Node, Position, RestMap
from src.models import GraphTraversalRequest, GraphTraversalResponse, GraphHeuristicsRequest
from fastapi.middleware.cors import CORSMiddleware
import src.models as models

app = FastAPI(
    title="Galactic Path Finder API",
    description = "An API for finding the shortest path between two points on a grid using various graph traversal algorithms.",
    version = "1.0.0",
    )

origins = [
    "http://localhost",
    "http://localhost:5173",  # Vite default port
    "https://galacticpathfinder.com",
    "https://www.galacticpathfinder.com",
    ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/graphtraversal/traverse", response_model=GraphTraversalResponse)
def post_graph_traversal(request: GraphTraversalRequest):
    current_time = datetime.now().timestamp()
    algorithm = request.algorithm
    start_point = request.startPoint
    end_point = request.endPoint
    raw_map = request.map
    heuristic = request.heuristic
    print("Managed to get here")

    # Check if the algorithm name is valid
    if algorithm not in get_graph_traversal_methods():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid algorithm name {algorithm}. Should be one of {str(get_graph_traversal_methods())}"
        )

    # Parse data
    algorithm = algorithm.strip()

    start_node = Node(Position(start_point.x, start_point.y), start_point.weight)
    end_node = Node(Position(end_point.x, end_point.y), end_point.weight)

    nodes = [Node(Position(node.x, node.y), node.weight) for node in raw_map]

    map_obj = RestMap(nodes, start_node, end_node)

    # Get optional heuristic and check if it is valid
    if heuristic not in get_heuristics(algorithm):
        heuristic = None

    if heuristic is not None:
        heuristic = heuristic.lower().strip()
        heuristic_func = get_heuristic_function(heuristic)
    else:
        heuristic_func = None

    # Find path
    pathfinder = get_pathfinder(algorithm)
    path, node_order = pathfinder.find_path(map_obj, start_node, end_node, heuristic_func)
    time_taken = datetime.now().timestamp() - current_time

    pathfinder_status = "success" if len(path) != 0 else "failure"
    
    path = [models.Position(x = node.x, y = node.y) for node in path]
    node_order = [models.Position(x = node.x, y = node.y) for node in node_order]

    return GraphTraversalResponse(
            status = pathfinder_status,
            path = path,
            nodeOrder = node_order,
            timeTaken = time_taken,
    )

@app.get("/graphtraversal/graph-traversal-methods", response_model=list[str])
def fetch_graph_traversal_methods():
    return get_graph_traversal_methods()

@app.post("/graphtraversal/graph-heuristics-methods", response_model=list[str])
def fetch_graph_heuristics(request: GraphHeuristicsRequest):
    method = request.method
    print(f"method in fetch_graph_heuristics: {method}")
    heuristics = get_heuristics(method)
    return heuristics



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

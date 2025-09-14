from datetime import datetime

from loguru import logger
from fastapi import HTTPException, status

from src import models
from src.factory import get_graph_traversal_methods, get_heuristic_function, get_heuristics, get_pathfinder
from src.models import GraphTraversalRequest, GraphTraversalResponse
from src.map import Node, Position, RestMap


def find_path(request: GraphTraversalRequest):
    current_time = datetime.now().timestamp()
    algorithm = request.algorithm
    start_point = request.startPoint
    end_point = request.endPoint
    raw_map = request.map
    heuristic = request.heuristic

    # Check if the algorithm name is valid
    if algorithm not in get_graph_traversal_methods():
        logger.error(f"Invalid algorithm name {algorithm}. Should be one of {str(get_graph_traversal_methods())}")
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
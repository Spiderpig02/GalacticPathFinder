""" This module contains the factory functions for the graph traversal algorithms """
from typing import Callable
from graphtraversal.algorithms.heuristics import euclidean_distance, manhattan_distance
from graphtraversal.algorithms.uninformed_search import (
    BFSPathfinder,
    DFSPathfinder,
)
from graphtraversal.algorithms.a_star import AStarPathfinder
from graphtraversal.algorithms.pathfinder import Pathfinder


graph_traversal_function_map: dict[str, Pathfinder] = {
    "a star": AStarPathfinder(),
    "breadth first search": BFSPathfinder(),
    "depth first search": DFSPathfinder(),
}


def get_pathfinder(graph_method_name: str) -> Pathfinder:
    """
    This function returns the pathfinder for the given graph method name
    """
    print(f"graph_method_name in factory: {graph_method_name}")
    return graph_traversal_function_map[graph_method_name]


def get_graph_traversal_methods() -> list[str]:
    """
    This function returns a list of all available graph traversal methods
    """
    method_names: list[str] = list(graph_traversal_function_map.keys())
    return method_names


def get_heuristics(graph_method_name: str) -> list[str]:
    """
    This function returns a list of heuristics that are valid for the given graph method name
    """
    match graph_method_name.lower():
        case "a star":
            return ["manhattan", "euclidean"]
        case "breadth first search":
            return []
        case "depth first search":
            return []
        case _:
            raise ValueError(f"Invalid graph method name: {graph_method_name}")


def get_heuristic_function(heuristic_name: str) -> Callable:
    """
    This function returns the heuristic function for the given heuristic name
    """
    match heuristic_name.lower():
        case "manhattan":
            return manhattan_distance
        case "euclidean":
            return euclidean_distance
        case _:
            raise ValueError(f"Invalid heuristic name: {heuristic_name}")

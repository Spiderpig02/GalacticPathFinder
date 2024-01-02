""" This module contains the factory functions for the graph traversal algorithms """
from graphtraversal.algorithms.a_star import AStarPathfinder
from graphtraversal.algorithms.pathfinder import Pathfinder


graph_traversal_function_map: dict[str, Pathfinder] = {
    "dijkstra": None,
    "a star": AStarPathfinder(),
    "bfs": None,
    # and so on...
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
    print(f"method_names: {method_names}")
    return method_names


def get_heuristics(graph_method_name: str) -> list[str]:
    """
    This function returns a list of heuristics that are valid for the given graph method name
    """
    match graph_method_name.lower():
        case "dijkstra":
            return []
        case "bfs":
            return []
        case "a star":
            return ["euclidean", "manhattan"]
        case _:
            raise ValueError(f"Invalid graph method name: {graph_method_name}")

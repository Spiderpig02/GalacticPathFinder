""" This module contains the factory functions for the graph traversal algorithms """


def get_heuristics(graph_method_name: str) -> list[str]:
    """
    This function returns a list of heuristics that are valid for the given graph method name
    """
    match graph_method_name:
        case "dijkstra":
            return []
        case "a_star":
            return ["euclidean", "manhattan"]
        case _:
            raise ValueError(f"Invalid graph method name: {graph_method_name}")

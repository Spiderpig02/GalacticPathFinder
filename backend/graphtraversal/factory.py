""" This module contains the factory functions for the graph traversal algorithms """
graph_traversal_function_map = {
    "dijkstra": None,
    "a star": None,
    "weighted a star": None,
    "bfs": None,
    "dfs": None,
    # and so on...
}


def get_graph_traversal_methods() -> list[str]:
    """
    This function returns a list of all available graph traversal methods
    """
    return list(graph_traversal_function_map.keys())


def get_heuristics(graph_method_name: str) -> list[str]:
    """
    This function returns a list of heuristics that are valid for the given graph method name
    """
    match graph_method_name:
        case "dijkstra":
            return []
        case "bfs":
            return []
        case "a star":
            return ["euclidean", "manhattan"]
        case _:
            raise ValueError(f"Invalid graph method name: {graph_method_name}")

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.map import RestMap
from graphtraversal.factory import get_heuristics, get_graph_traversal_methods


@api_view(["POST"])
def post_graph_traversal(request):
    """
    This endpoint performs a graph traversal based on the provided algorithm,
        heuristic (if applicable), start and end points, and the map
    """

    try:
        # Get mandatory parameters
        graph_method_name: str = request.data["algorithm"]
        start_point: list[int, int] = request.data["startPoint"]
        end_point: list[int, int] = request.data["endPoint"]
        map: list[list[int, int]] = request.data["map"]
        print(
            f"graph_method_name: {graph_method_name}, start_point: {start_point}, end_point: {end_point}, map: {map}"
        )
        # Get optional heuristic
        heuristic: str = request.data.get("heuristic", None)
        print(f"heuristic: {heuristic}")
        # Create a map object
        map = RestMap(map, start_point, end_point)
        # Check if the algorithm name is valid
        if graph_method_name not in get_graph_traversal_methods():
            raise ValueError("Invalid algorithm name" + graph_method_name)

        if heuristic not in get_heuristics(graph_method_name):
            heuristic = None

        # Find path
        # pathfinder: Pathfinder = get_graph_traversal_methods()[graph_method_name]
        # path, node_order = pathfinder.find_path(map, start_point, end_point, heuristic)

        # pathfinder_status: str = "success" if path is not None else "failure"

        ##### CREATE MOCK DATA #####
        pathfinder_status = "success"
        path = [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3]]
        node_order = [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3]]
        return Response(
            status=status.HTTP_200_OK,
            data={"message": pathfinder_status, "path": path, "nodeOrder": node_order},
        )

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def fetch_graph_traversal_methods(request):
    """
    This endpoint retrieves all legal graph traversal methods that this service provides.
    """
    try:
        return Response(status=status.HTTP_200_OK, data=get_graph_traversal_methods())

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def fetch_graph_heuristics(request):
    """
    This endpoint returns a list of available heuristics for a given graph traversal method
    """
    try:
        heuristics: list[str] = get_heuristics(request.data["graph_method_name"])
        return Response(status=status.HTTP_200_OK, data=heuristics)

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json

from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.map import RestMap, Node, Position
from graphtraversal.factory import (
    get_heuristics,
    get_graph_traversal_methods,
    get_pathfinder,
)


@api_view(["POST"])
def post_graph_traversal(request):
    """
    post:
    This endpoint performs a graph traversal based on the provided algorithm,
    heuristic (if applicable), start and end points, and the map.

    - Parameters:
      - algorithm: Name of the graph traversal algorithm
      - startPoint: The starting point coordinates
      - endPoint: The ending point coordinates
      - map: The map layout
      - heuristic (optional): The heuristic method to use

    - Response:
      - status: HTTP status code
      - message: Status message
      - path: Calculated path
      - nodeOrder: Order of nodes visited
    """

    try:
        # Check if all mandatory parameters are present
        if request.data.get("algorithm", None) is None:
            raise ValueError("Invalid request. Missing 'algorithm' parameter")
        if request.data.get("startPoint", None) is None:
            raise ValueError("Invalid request. Missing 'startPoint' parameter")
        if request.data.get("endPoint", None) is None:
            raise ValueError("Invalid request. Missing 'endPoint' parameter")
        if request.data.get("map", None) is None:
            raise ValueError("Invalid request. Missing 'map' parameter")

        # Get mandatory parameters
        algorithm: str = request.data["algorithm"]
        start_point = request.data["startPoint"]
        end_point = request.data["endPoint"]
        raw_map = request.data["map"]

        # Check if the algorithm name is valid
        if algorithm not in get_graph_traversal_methods():
            raise ValueError(
                f"Invalid algorithm name {algorithm} Should be one of {str(get_graph_traversal_methods())}"
            )

        # Parse data
        algorithm: str = (algorithm.lower()).strip()

        start_point: Node = Node(
            Position(int(start_point.get("x", 0)), int(start_point.get("y", 0))),
            float(start_point.get("weight", 0)),
        )

        end_point: Node = Node(
            Position(int(end_point.get("x", 0)), int(end_point.get("y", 0))),
            float(end_point.get("weight", 0)),
        )

        nodes = []
        for node in raw_map:
            x = int(node.get("x", 0))
            y = int(node.get("y", 0))
            weight = float(node.get("weight", 0))

            nodes.append(Node(Position(x, y), weight))

        map: RestMap = RestMap(
            nodes,
            start_point,
            end_point,
        )

        # Get optional heuristic and check if it is valid
        heuristic: str = request.data.get("heuristic", None)
        if heuristic not in get_heuristics(algorithm):
            heuristic = None

        # Find path
        pathfinder: Pathfinder = get_pathfinder(algorithm)
        print(f"pathfinder: {pathfinder}")
        # path, node_order = pathfinder.find_path(map, start_point, end_point, heuristic)

        # pathfinder_status: str = "success" if path is not None else "failure"

        # show the parsed data
        print(f"algorithm: {algorithm}")
        print(f"start_point: {start_point}")
        print(f"end_point: {end_point}")
        print(f"map: {map}")

        ##### CREATE MOCK DATA #####
        pathfinder_status = "success"
        # Serialize the list of dictionaries to a JSON string
        path = [node.to_dict() for node in nodes]
        serialized_path = json.dumps(path)

        node_order = [node.to_dict() for node in nodes]
        serialized_node_order = json.dumps(node_order)
        return Response(
            status=status.HTTP_200_OK,
            data={
                "message": pathfinder_status,
                "path": serialized_path,
                "nodeOrder": serialized_node_order,
            },
        )

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("====================================")
        print("Exception: ", e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def fetch_graph_traversal_methods(request):
    """
    get:
    This endpoint retrieves all legal graph traversal methods that this service provides.

    This endpoint does not require any parameters.

    - Response:
      - status: HTTP status code
      - data: List of available graph traversal methods
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
    post:

    - Parameters:
      - graph_method_name: Name of the graph traversal method for which heuristics are required

    - Response:
      - status: HTTP status code
      - data: List of heuristics available for the specified graph traversal method
    """
    try:
        if "methods" not in request.data:
            raise ValueError("Invalid request. Missing 'methods' parameter")

        heuristics: list[str] = get_heuristics(request.data["methods"])
        return Response(status=status.HTTP_200_OK, data=heuristics)

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

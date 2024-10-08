from typing import Callable
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import JSONParser
from datetime import datetime

from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.serializers import (
    GraphHeuristicsSerializer,
    GraphTraversalMethodSerializer,
    GraphTraversalSerializer,
)
from graphtraversal.map import Map, RestMap, Node, Position
from graphtraversal.factory import (
    get_heuristic_function,
    get_heuristics,
    get_graph_traversal_methods,
    get_pathfinder,
)


@swagger_auto_schema(
    method="post",
    request_body=GraphTraversalSerializer,
    responses={
        # 200: GraphTraversalSerializer,
        400: "Invalid request",
        500: "Internal server error",
    },
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
    # Parse and validate the data
    serializer = GraphTraversalSerializer(data=request.data)
    if serializer.is_valid():
        current_time = datetime.now().timestamp()
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
        algorithm: str = (algorithm).strip()

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

        map: Map = RestMap(
            nodes,
            start_point,
            end_point,
        )

        # Get optional heuristic and check if it is valid
        heuristic: str = request.data.get("heuristic", None)
        if heuristic not in get_heuristics(algorithm):
            heuristic = None

        if heuristic is not None:
            heuristic: str = (heuristic.lower()).strip()
            heuristic: Callable = get_heuristic_function(heuristic)

        # Find path
        pathfinder: Pathfinder = get_pathfinder(algorithm)
        path, node_order = pathfinder.find_path(map, start_point, end_point, heuristic)
        time_taken = datetime.now().timestamp() - current_time
        print(f"path: {path}")
        print(f"node_order: {node_order}")
        pathfinder_status: str = "success" if len(path) != 0 else "failure"

        # Serialize the list of dictionaries to a JSON string
        path_dicts = [node.to_dict() for node in path]
        serialized_path = json.dumps(path_dicts)

        node_order_dicts = [node.to_dict() for node in node_order]
        serialized_node_order = json.dumps(node_order_dicts)
        return Response(
            status=status.HTTP_200_OK,
            data={
                "status": pathfinder_status,
                "path": serialized_path,
                "nodeOrder": serialized_node_order,
                "timeTaken": time_taken,
            },
        )
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)



@swagger_auto_schema(
    method="get",
    operation_summary="Get all legal graph traversal methods",
    operation_description="This endpoint retrieves all legal graph traversal methods that this service provides.",
    responses={200: GraphTraversalMethodSerializer},
)
@api_view(["GET"])
def fetch_graph_traversal_methods(request):
    return Response(status=status.HTTP_200_OK, data=get_graph_traversal_methods())


@swagger_auto_schema(
    method="post",
    operation_summary="Get all legal heuristics for a given graph traversal method",
    operation_description="This endpoint retrieves all legal heuristics for a given graph traversal method that this service provides.",
    request_body=GraphTraversalMethodSerializer,
    responses={200: GraphHeuristicsSerializer},
)
@api_view(["POST"])
def fetch_graph_heuristics(request):

    serializer = GraphTraversalMethodSerializer(data=request.data)
    if serializer.is_valid():
        heuristic = request.data.get("method", None)
        if heuristic is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        heuristics: list[str] = get_heuristics(heuristic)
        return Response(status=status.HTTP_200_OK, data=heuristics)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

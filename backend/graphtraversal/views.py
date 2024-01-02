from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

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
        return Response(status=status.HTTP_200_OK, data=get_graph_traversal_methods())

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

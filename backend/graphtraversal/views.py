from django.shortcuts import render

from django.shortcuts import render

# from django.http import JsonResponse, HttpResponse, HttpRequest
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
        print("Success")
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
    print("GET fetch_graph_traversal_methods was called")
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
    print("POST fetch_graph_heuristics was called")
    try:
        heuristics: list[str] = get_heuristics(request.data["graph_method_name"])
        return Response(status=status.HTTP_200_OK, data=heuristics)

    except ValueError as va:
        print(va)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

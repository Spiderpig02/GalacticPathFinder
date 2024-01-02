from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, HttpRequest
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from factory import get_heuristics


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
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


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def fetch_graph_heuristics(request) -> HttpResponse[list[str]]:
    """
    This endpoint returns a list of available heuristics for a given graph traversal method
    """
    try:
        heuristics: list[str] = get_heuristics(request.data["graph_method_name"])
        return HttpResponse(data=heuristics, status=status.HTTP_200_OK)
    except ValueError as va:
        print(va)
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return HttpResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

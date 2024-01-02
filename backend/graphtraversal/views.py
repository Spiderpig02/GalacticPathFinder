from django.shortcuts import render

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status


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

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def get_graph_traversal_methods(request):
    """
    This endpoint retrieves all legal graph traversal methods that this service provides.
    """
    try:
        print("Success")
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

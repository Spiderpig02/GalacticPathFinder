from django.test import TestCase, Client
from rest_framework import status
from .views import (
    get_graph_traversal_methods,
    get_heuristics,
)  # adjust import path as necessary


# Create your tests here.

baseDir = "http://127.0.0.1:8000/graphtraversal"


class GraphTraversalMethodsTests(TestCase):
    def test_fetch_graph_traversal_methods_success(self):
        client = Client()
        response = client.get(
            f"{baseDir}/graph-traversal-methods"
        )  # adjust URL as necessary
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, get_graph_traversal_methods())


class GraphHeuristicsTests(TestCase):
    def test_fetch_graph_heuristics_success(self):
        client = Client()
        valid_method_name = get_graph_traversal_methods()[
            0
        ]  # replace with a valid method name
        response = client.post(
            f"{baseDir}/graph-heuristics-methods",
            {"methods": valid_method_name},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, get_heuristics(valid_method_name))

    def test_fetch_graph_heuristics_invalid_method(self):
        client = Client()
        response = client.post(
            f"{baseDir}/graph-heuristics-methods",
            {"methods": "invalid_method"},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_fetch_graph_heuristics_invalid_attribute_name(self):
        client = Client()
        valid_method_name = get_graph_traversal_methods()[0]
        invalid_attribute_name = "invalid_attribute_name"

        response = client.post(
            f"{baseDir}/graph-heuristics-methods",
            {invalid_attribute_name: valid_method_name},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

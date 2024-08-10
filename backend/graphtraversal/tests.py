import json
from django.test import TestCase, Client
from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.factory import get_pathfinder
from graphtraversal.map import Map, Node, Position, RestMap
from rest_framework import status
from .views import (
    get_graph_traversal_methods,
    get_heuristics,
)


# Create your tests here.

baseDir = "/graphtraversal"


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
            {"method": valid_method_name},
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


class TraversalTests(TestCase):
    def test_traverse_map_given_valid_data_without_heuristic(self):
        client = Client()
        for algorithm in get_graph_traversal_methods():
            data = {
                "algorithm": algorithm,
                "startPoint": {"x": 0, "y": 0, "weight": 1},
                "endPoint": {"x": 1, "y": 1, "weight": 1},
                "map": [
                    {"x": 0, "y": 0, "weight": 0},
                    {"x": 0, "y": 1, "weight": 1},
                    {"x": 1, "y": 0, "weight": 2},
                    {"x": 1, "y": 1, "weight": 3},
                ],
            }

            response = client.post(
                f"{baseDir}/traverse",
                json.dumps(data),  # Send request data as a JSON string
                content_type="application/json",  # Specify the content type as JSON
            )
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_traverse_map_with_sentinel_obstacles(self):

        for algorithm in get_graph_traversal_methods():
            print(f" SENTINAL algorithm: {algorithm}", flush=True)
            # Map
            # 0 0 0
            # 0 X 0
            # S X E
            start_point = Node(Position(0, 2), 0)
            end_point = Node(Position(2, 2), 0)
            nodes = [
                Node(Position(0, 0), 0),
                Node(Position(0, 1), 0),
                Node(Position(0, 2), 0),
                Node(Position(1, 0), 0),
                Node(Position(1, 1), -1),
                Node(Position(1, 2), -1),
                Node(Position(2, 0), 0),
                Node(Position(2, 1), 0),
                Node(Position(2, 2), 0),
            ]

            map: Map = RestMap(
                nodes,
                start_point,
                end_point,
            )
            pathfinder: Pathfinder = get_pathfinder(algorithm)
            heuristic = None
            path, node_order = pathfinder.find_path(
                map, start_point, end_point, heuristic
            )

            expected_path = [
                Position(0, 2),
                Position(0, 1),
                Position(0, 0),
                Position(1, 0),
                Position(2, 0),
                Position(2, 1),
                Position(2, 2),
            ]

            # Compare the path from the response to the expected path
            self.assertEqual(path, expected_path)

    def test_traverse_map_given_valid_data_with_heuristic(self):
        client = Client()
        for algorithm in get_graph_traversal_methods():
            for heuristic in get_heuristics(algorithm):
                data = {
                    "algorithm": algorithm,
                    "startPoint": {"x": 0, "y": 0, "weight": 1},
                    "endPoint": {"x": 1, "y": 1, "weight": 1},
                    "map": [
                        {"x": 0, "y": 0, "weight": 0},
                        {"x": 0, "y": 1, "weight": 1},
                        {"x": 1, "y": 0, "weight": 2},
                        {"x": 1, "y": 1, "weight": 3},
                    ],
                    "heuristic": heuristic,
                }
                response = client.post(
                    f"{baseDir}/traverse",
                    json.dumps(data),
                    content_type="application/json",
                )
                self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_traverse_map_given_invalid_data_without_heuristic(self):
        client = Client()
        valid_start_position = ({"x": 0, "y": 0, "weight": 1},)
        valid_end_position = ({"x": 1, "y": 1, "weight": 1},)
        valid_map = [
            {"x": 0, "y": 0, "weight": 0},
            {"x": 0, "y": 1, "weight": 1},
            {"x": 1, "y": 0, "weight": 2},
            {"x": 1, "y": 1, "weight": 3},
        ]

        for valid_algorithm in get_graph_traversal_methods():
            data = {
                "invalid": valid_algorithm,
                "invalid": valid_start_position,
                "invalid": valid_end_position,
                "invalid": valid_map,
            }

            response = client.post(
                f"{baseDir}/traverse",
                json.dumps(data),
                content_type="application/json",
            )
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_traverse_map_given_invalid_data_with_heuristic(self):
        client = Client()
        valid_method_name = get_graph_traversal_methods()[0]
        valid_start_position = ({"x": 0, "y": 0, "weight": 1},)
        valid_end_position = ({"x": 1, "y": 1, "weight": 1},)
        valid_map = [
            {"x": 0, "y": 0, "weight": 0},
            {"x": 0, "y": 1, "weight": 1},
            {"x": 1, "y": 0, "weight": 2},
            {"x": 1, "y": 1, "weight": 3},
        ]
        valid_heuristic = get_heuristics(valid_method_name)[0]
        data = {
            "invalid": valid_method_name,
            "invalid": valid_start_position,
            "invalid": valid_end_position,
            "invalid": valid_map,
            "invalid": valid_heuristic,
        }
        response = client.post(
            f"{baseDir}/traverse",
            json.dumps(data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  #

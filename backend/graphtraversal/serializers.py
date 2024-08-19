from rest_framework import serializers


class NodeSerializer(serializers.Serializer):
    x = serializers.IntegerField(help_text="X coordinate of the node")
    y = serializers.IntegerField(help_text="Y coordinate of the node")
    weight = serializers.FloatField(help_text="Weight of the node")


class GraphTraversalSerializer(serializers.Serializer):
    algorithm = serializers.CharField(help_text="Graph traversal algorithm to be used")
    startPoint = NodeSerializer(help_text="Start point of the path")
    endPoint = NodeSerializer(help_text="End point of the path")
    map = NodeSerializer(many=True, help_text="List of nodes in the map")
    heuristic = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="Optional heuristic function to be used in the graph traversal",
    )


class GraphTraversalResponseSerializer(serializers.Serializer):
    path = NodeSerializer(many=True, help_text="List of nodes in the path")
    cost = serializers.FloatField(help_text="Cost of the path")


class GraphTraversalMethodSerializer(serializers.Serializer):
    method = serializers.CharField(help_text="Name of the graph traversal method")


class GraphHeuristicsSerializer(serializers.Serializer):
    heuristics = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of available heuristics for a given graph traversal method",
    )

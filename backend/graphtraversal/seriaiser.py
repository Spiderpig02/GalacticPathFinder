import json
from dataclasses import asdict
from graphtraversal.map import Node, Position


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Node) or isinstance(obj, Position):
            return asdict(obj)
        return super().default(obj)

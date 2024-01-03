from dataclasses import dataclass, asdict
from abc import ABC, ABCMeta, abstractmethod
from typing import Any, Dict


@dataclass(frozen=True)
class Position:
    """
    A position in the graph. Contains the x and y coordinates.
    """

    x: int
    y: int

    def to_dict(self):
        return asdict(self)


@dataclass(frozen=True)
class Node:
    """
    A node in the search tree. Contains the position and the cost to reach it.
    """

    position: Position
    weight: float

    def to_dict(self):
        return {"x": self.position.x, "y": self.position.y, "weight": self.weight}


class Map(ABC):
    """A interface for the map with only the methods needed for the A* algorithm."""

    @classmethod
    def __instancecheck__(cls: ABCMeta, instance: Any) -> bool:
        return cls.__subclasscheck__(type(instance))

    @classmethod
    def __subclasscheck__(cls: ABCMeta, subclass: type) -> bool:
        return (
            hasattr(subclass, "get_neighbors")
            and callable(subclass.get_neighbors)
            and hasattr(subclass, "get_cell_value")
            and callable(subclass.get_cell_value)
        )

    @abstractmethod
    def get_neighbors(self, position: Position) -> list[Position]:
        """Find all legal neighbors of a position"""
        pass

    @abstractmethod
    def get_cell_value(self, position: Position) -> int:
        """Getter for the value (cost) of the cell at `pos`"""
        pass


@dataclass()
class RestMap(Map):
    """A map made from the REST API"""

    map: list[Node]
    start_pos: Node
    goal_pos: Node

    def __post_init__(self):
        """
        After the map is initialized, we can cache the neighbors and values so we don't have to recalculate them every time.
        """
        self._neighbor_cache: Dict[Position, list[Position]] = {}
        self._value_cache: Dict[Position, int] = {}

    def get_neighbors(self, position: Position) -> list[Position]:
        """Find all legal neighbors of a position"""
        if position in self._neighbor_cache:
            return self._neighbor_cache[position]

        neighbors = []
        for node in self.map:
            if node.position.x == position.x and node.position.y == position.y:
                continue
            if (
                abs(node.position.x - position.x) <= 1
                and abs(node.position.y - position.y) <= 1
            ):
                neighbors.append(node.position)
        return neighbors

    def get_cell_value(self, position: Position) -> int:
        """Getter for the value (weight) of the cell at `pos`"""
        if position in self._value_cache:
            return self._value_cache[position]

        for n in self.map:
            if n.position == position:
                node = n
                break
        return node.weight

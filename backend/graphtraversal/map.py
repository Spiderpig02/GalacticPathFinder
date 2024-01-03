from dataclasses import dataclass, asdict
from abc import ABC, ABCMeta, abstractmethod
from typing import Any


@dataclass()
class Position:
    """
    A position in the graph. Contains the x and y coordinates.
    """

    x: int
    y: int

    def to_dict(self):
        return {"position": self.position.to_dict(), "cost": self.cost}


@dataclass(frozen=True)
class Node:
    """
    A node in the search tree. Contains the position and the cost to reach it.
    """

    position: Position
    cost: float

    def to_dict(self):
        return asdict(self)


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

    def get_neighbors(self, position: Position) -> list[Position]:
        """Find all legal neighbors of a position"""
        neighbors = []
        x = position.x
        y = position.y
        if x > 0:
            neighbors.append(Position([x - 1, y]))
        if x < len(self.map) - 1:
            neighbors.append(Position([x + 1, y]))
        if y > 0:
            neighbors.append(Position([x, y - 1]))
        if y < len(self.map[0]) - 1:
            neighbors.append(Position([x, y + 1]))
        return neighbors

    def get_cell_value(self, position: Position) -> int:
        """Getter for the value (cost) of the cell at `pos`"""
        node = self.map[position.x][position.y]
        return node.cost

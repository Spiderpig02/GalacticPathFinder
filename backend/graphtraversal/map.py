from dataclasses import dataclass
from abc import ABC, ABCMeta, abstractmethod
from typing import Any


@dataclass()
class Position:
    """
    A position in the graph. Contains the x and y coordinates.
    """

    x: int
    y: int

    def __init__(self, list: list[int, int]):
        self.x = list[0]
        self.y = list[1]


@dataclass(frozen=True)
class Node:
    """
    A node in the search tree. Contains the position and the cost to reach it.
    """

    position: Position
    cost: float


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
            and hasattr(subclass, "set_start_pos")
            and callable(subclass.set_start_pos)
            and hasattr(subclass, "set_goal_pos")
            and callable(subclass.set_goal_pos)
            and hasattr(subclass, "get_start_pos")
            and callable(subclass.get_start_pos)
            and hasattr(subclass, "get_goal_pos")
            and callable(subclass.get_goal_pos)
            and hasattr(subclass, "get_cell_value")
            and callable(subclass.get_cell_value)
        )

    @abstractmethod
    def get_neighbors(self, position: Position) -> list[Position]:
        """Find all legal neighbors of a position"""
        pass

    @abstractmethod
    def set_start_pos(start_pos: Position):
        """Setter for the starting position"""
        pass

    @abstractmethod
    def set_goal_pos(goal_pos: Position):
        """Setter for the goal position"""
        pass

    @abstractmethod
    def get_start_pos():
        """Getter for the starting position of the current task"""
        pass

    @abstractmethod
    def get_goal_pos():
        pass

    @abstractmethod
    def get_cell_value(self, position: Position) -> int:
        """Getter for the value (cost) of the cell at `pos`"""
        pass


@dataclass()
class RestMap(Map):
    """A map made from the REST API"""

    map: list[Node]
    start_pos: Position
    goal_pos: Position

    def __init__(
        self,
        raw_map: list[list[int, int], int],
        start_pos: list[int, int],
        goal_pos: list[int, int],
    ):
        """
        Create a map from the raw representation of the map.

        Args:
            raw_map (list[list[int, int], int]): The raw representation of the map of the form [[x, y], cost]
            start_pos (list[int, int]): The starting position
            goal_pos (list[int, int]): The goal position
        """
        self.map = []
        for raw_cell in raw_map:
            node = Node(Position(raw_cell[0]), raw_cell[1])
            self.map.append(node)

        self.start_pos = Position(start_pos)
        self.goal_pos = Position(goal_pos)

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

    def set_start_pos(self, start_pos: Position):
        """Setter for the starting position"""
        self.start_pos = start_pos

    def set_goal_pos(self, goal_pos: Position):
        """Setter for the goal position"""
        self.goal_pos = goal_pos

    def get_start_pos(self):
        """Getter for the starting position of the current task"""
        return self.start_pos

    def get_goal_pos(self):
        return self.goal_pos

    def get_cell_value(self, position: Position) -> int:
        """Getter for the value (cost) of the cell at `pos`"""
        node = self.map[position.x][position.y]
        return node.cost

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

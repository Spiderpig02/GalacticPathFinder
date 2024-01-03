from dataclasses import dataclass
from abc import ABC, ABCMeta, abstractmethod
from typing import Any, Callable

from graphtraversal.map import Map, Node


class Pathfinder(ABC):
    """
    A interface for pathfinding algorithms.
    Follows the Strategy design pattern. Read more here: https://en.wikipedia.org/wiki/Strategy_pattern
    """

    @classmethod
    def __instancecheck__(cls: ABCMeta, instance: Any) -> bool:
        return cls.__subclasscheck__(type(instance))

    @classmethod
    def __subclasscheck__(cls: ABCMeta, subclass: type) -> bool:
        return hasattr(subclass, "find_path") and callable(subclass.find_path)

    @abstractmethod
    def find_path(
        self,
        map: Map,
        start: Node,
        goa: Node,
        heuristic: Callable,
    ) -> tuple[list[Node], list[Node]]:
        """
        Find a path from start_pos to goal_pos on the map using the algorithm
        It will use the heuristic if it is provided and the algorithm supports it.

        Args:
            map (Map): The map on which the algorithm is run
            start_pos (Position): The start position
            goal_pos (Position): The goal position
            heuristic (Callable): The heuristic function to use
        Returns:
            - The path from the start to the goal node or None if no path exists
            - The order in which the nodes were visited
        """
        pass

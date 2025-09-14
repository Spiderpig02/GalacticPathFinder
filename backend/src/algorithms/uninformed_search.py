""" Contains the uninformed search algorithms. """

from typing import Callable

from src.algorithms.search_utils import reconstruct_path
from src.algorithms.pathfinder import Pathfinder
from src.map import Map, Node, Position


class BFSPathfinder(Pathfinder):
    def find_path(
        self, map: Map, start: Node, goal: Node, heuristic: Callable
    ) -> tuple[list[Position], list[Node]]:
        # Does not use heuristic in BFS
        return BFS(map, start, goal)


class DFSPathfinder(Pathfinder):
    def find_path(
        self, map: Map, start: Node, goal: Node, heuristic: Callable
    ) -> tuple[list[Position], list[Node]]:
        # Does not use heuristic in DFS
        return DFS(map, start, goal)


class QueueFrontier:
    """
    The frontier is a priority queue of nodes. The nodes are sorted by it cost.
    """

    def __init__(self, start_pos):
        """Instantiate a frontier object."""
        self.frontier = [start_pos]

    def append(self, position):
        """
        Inserts a node into the frontier. The node is inserted in the
        correct position based on its cost and distance towards the goal.
        Args:
            position (Position): The position of the node
            cost (float, optional): The cost to reach the node. Defaults to 0.
        """
        self.frontier.append(position)

    def pop(self):
        """
        Finds the node with the lowest cost in the frontier and returns it.
        As the frontier is sorted, the node with the lowest cost is the last
        """
        return self.frontier.pop(0)

    def is_empty(self):
        """Checks if the frontier is empty"""
        return len(self.frontier) == 0

    def contains(self, object) -> bool:
        """Getter for the frontier"""
        return object in self.frontier


class StackFrontier:
    """
    The frontier is a stack.
    """

    def __init__(self, start_pos):
        """Instantiate a frontier object."""
        self.frontier = [start_pos]

    def append(self, position):
        self.frontier.append(position)

    def pop(self):
        return self.frontier.pop()

    def is_empty(self):
        """Checks if the frontier is empty"""
        return len(self.frontier) == 0

    def get_frontier(self) -> Position:
        """Getter for the frontier"""
        return self.frontier

    def contains(self, object) -> bool:
        """Getter for the frontier"""
        return object in self.frontier


def BFS(map: Map, start: Node, goal: Node) -> tuple[list[Position], list[Node]]:
    """Breadth first search"""
    return _search(map, start, goal, QueueFrontier)


def DFS(map: Map, start: Node, goal: Node) -> tuple[list[Position], list[Node]]:
    """Depth first search"""
    return _search(map, start, goal, StackFrontier)


def _search(
    map: Map, start: Node, goal: Node, frontier_type: Callable
) -> tuple[list[Position], list[Node]]:
    """
    This function performs a breadth first search on the given map.
    """

    start_pos: Position = start.position
    goal_pos: Position = goal.position
    # Initialize the frontier with the start node
    frontier: list[Node] = frontier_type(start_pos)
    explored = []
    came_from = {}
    path = []

    # Keep looping until the frontier is empty
    while not frontier.is_empty():
        # Get the next node from the frontier
        current_node = frontier.pop()
        explored.append(current_node)
        if current_node == goal_pos:
            # We have reached the goal, so we can stop searching
            path = reconstruct_path(came_from, current_node)
            return path, explored
        # We haven't reached the goal, so we need to expand the node
        for neighbor in map.get_neighbors(current_node):
            # Check if the neighbor is already explored
            if (neighbor not in explored) and (frontier.contains(neighbor) == False):
                # Add the neighbor to the frontier
                frontier.append(neighbor)
                came_from[neighbor] = current_node

    # No path exists
    return None

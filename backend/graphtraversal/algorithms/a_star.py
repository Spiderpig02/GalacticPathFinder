from dataclasses import dataclass
from typing import Callable

from graphtraversal import factory
from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.map import Map, Node, Position


class Frontier:
    """
    The frontier is a priority queue of nodes. The nodes are sorted by it cost.
    """

    def __init__(self, start_pos: Position, goal_pos: Position, heuristic: Callable):
        """Instantiate a frontier object."""
        self.frontier = [Node(start_pos, 0)]
        self.goal_pos = goal_pos
        self.heuristic = heuristic

    def get_frontier(self) -> Position:
        """Getter for the frontier"""
        return self.frontier

    def insert(self, position: Position, cost: float = 0):
        """
        Inserts a node into the frontier. The node is inserted in the
        correct position based on its cost and distance towards the goal.
        Args:
            position (Position): The position of the node
            cost (float, optional): The cost to reach the node. Defaults to 0.
        """
        self.frontier.append(Node(position, cost))
        self.frontier.sort(
            reverse=True,
            key=lambda node: node.weight + self.heuristic(node.position, self.goal_pos),
        )

    def pop(self):
        """
        Finds the node with the lowest cost in the frontier and returns it.
        As the frontier is sorted, the node with the lowest cost is the last
        """
        node: Node = self.frontier.pop()
        return node.position

    def is_empty(self):
        """Checks if the frontier is empty"""
        return len(self.frontier) == 0


class AStarPathfinder(Pathfinder):
    def find_path(
        self, map: Map, start: Node, goal: Node, heuristic: Callable
    ) -> tuple[list[Node], list[Node]]:
        if heuristic is None:
            heuristic = factory.get_heuristic_function("a star")[0]
        print(f"heuristic in a star pathfinder: {heuristic}")
        return a_star(map, start, goal, heuristic)


def a_star(map: Map, start: Node, goal: Node, heuristic: Callable) -> list[Position]:
    """
    A* algorithm implementation

    Args:
        map (Map): The map on which the algorithm is run
        start_pos (Position): The start Node with position.
        goal_pos (Position): The goal Node with position.
    Returns:
        The path from the start to the goal node or None if no path exists
    """
    start_pos: Position = start.position
    goal_pos: Position = goal.position

    # Initialize the frontier with the start position
    frontier = Frontier(start_pos, goal_pos, heuristic)
    # Initialize the came_from dictionary
    # For node n, came_from[n] is the node immediately preceding it on the cheapest path from the start to n currently known.

    came_from = {}
    # Initialize the cost_to_reach_position dictionary, the first node has no cost
    # The sentinel value is not infinity but rather None, So all values not explicitly set are None
    cost_to_reach_position = {}
    cost_to_reach_position[start_pos] = 0

    estimated_remaining_distance = {}
    estimated_remaining_distance[start_pos] = heuristic(start_pos, goal_pos)

    while not frontier.is_empty():
        # Get the node with the lowest estimated distance from goal_pos from the frontier
        # And remove it from the frontier
        current = frontier.pop()
        if current == goal_pos:
            path = reconstruct_path(came_from, current)
            order = list(came_from.keys())
            return path, order

        for neighbor in map.get_neighbors(current):
            # Calculate the cost to reach the neighbor through current
            # tentative_cost_to_reach is the distance from start to the neighbor through current
            tentative_cost_to_reach = cost_to_reach_position[
                current
            ] + map.get_cell_value(neighbor)
            current_cost = cost_to_reach_position.get(neighbor)

            if current_cost is None or tentative_cost_to_reach < current_cost:
                # This path to neighbor is better than any previous one. Record it!

                came_from[neighbor] = current
                cost_to_reach_position[neighbor] = tentative_cost_to_reach
                estimated_remaining_distance[
                    neighbor
                ] = tentative_cost_to_reach + heuristic(neighbor, goal_pos)

                # Add the neighbor to the frontier if it is not explored yet
                if neighbor not in frontier.get_frontier():
                    frontier.insert(neighbor, tentative_cost_to_reach)
    return None


def reconstruct_path(came_from: dict, current: Position) -> list[Position]:
    """
    Reconstructs the path from the start to the goal node

    Args:
        came_from (dict):  Dictionary with the path from the start to the goal node
        current (Position): The goal node

    Returns:
        list[Position]
        The path from the start to the goal node
    """
    total_path = [current]
    while current in came_from.keys():
        # Stop if there is a cycle in the path
        if current == came_from[current]:
            break
        current = came_from[current]
        total_path.append(current)
    return total_path


def a_star_heuristic(current_pos: Position, goal_pos: Position) -> float:
    """
    A heuristic function for A*. Calculates the manhattan distance

    Args:
        current_pos (Position): The current position
        goal_pos (Position): The goal position
    Returns:
        float: The heuristic value
    """
    # Calculate the heuristic value for the given position
    # Manhatten distance = |x1 - x2| + |y1 - y2|
    x_distance = abs(current_pos.x - goal_pos.x)
    y_distance = abs(current_pos.y - goal_pos.y)
    return x_distance + y_distance

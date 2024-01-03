from graphtraversal.map import Position

from math import sqrt


def manhattan_distance(current_pos: Position, goal_pos: Position) -> float:
    """
    Calculates the manhattan distance

    Manhatten distance = |x1 - x2| + |y1 - y2|

     Args:
         current_pos (Position): The current position
         goal_pos (Position): The goal position
     Returns:
         float: The heuristic value
    """
    x_distance = abs(current_pos.x - goal_pos.x)
    y_distance = abs(current_pos.y - goal_pos.y)
    return x_distance + y_distance


def euclidean_distance(current_pos: Position, goal_pos: Position) -> float:
    """
    Calculates the Euclidean distance.

    Euclidean distance = sqrt((x1 - x2)^2 + (y1 - y2)^2)

    Args:
        current_pos (Position): The current position.
        goal_pos (Position): The goal position.

    Returns:
        float: The heuristic value.
    """
    x_distance = (current_pos.x - goal_pos.x) ** 2
    y_distance = (current_pos.y - goal_pos.y) ** 2
    return sqrt(x_distance + y_distance)

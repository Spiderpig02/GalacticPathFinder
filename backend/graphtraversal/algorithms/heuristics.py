from graphtraversal.map import Position


def manhattan_distance(current_pos: Position, goal_pos: Position) -> float:
    """
    Calculates the manhattan distance

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

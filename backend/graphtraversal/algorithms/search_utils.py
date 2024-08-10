from graphtraversal.map import Position


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
    print("[INFO] Reconstructing path...")
    print(f"came_from: {came_from}")
    total_path = [current]
    while current in came_from.keys():
        # Stop if there is a cycle in the path
        if current == came_from[current]:
            break
        current = came_from[current]
        total_path.append(current)
    total_path.reverse()
    return total_path

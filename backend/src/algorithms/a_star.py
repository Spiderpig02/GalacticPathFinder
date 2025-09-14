from typing import Callable
from src.algorithms.heuristics import euclidean_distance
from src.algorithms.pathfinder import Pathfinder
from src.map import Map, Node, Position
from src.algorithms.search_utils import reconstruct_path

import heapq
import itertools

class Frontier:
    def __init__(self, start_pos: Position, goal_pos: Position, heuristic: Callable):
        self.goal_pos = goal_pos
        self.heuristic = heuristic
        self.frontier = []
        self.counter = itertools.count()  # unique sequence count
        start_f = heuristic(start_pos, goal_pos)
        heapq.heappush(self.frontier, (start_f, 0, next(self.counter), start_pos))

    def insert(self, position: Position, cost: float = 0):
        f = cost + self.heuristic(position, self.goal_pos)
        heapq.heappush(self.frontier, (f, cost, next(self.counter), position))

    def pop(self):
        f, g, _, pos = heapq.heappop(self.frontier)
        return g, pos

    def is_empty(self):
        return not self.frontier


class AStarPathfinder(Pathfinder):
    def find_path(
        self, map: Map, start: Node, goal: Node, heuristic: Callable
    ) -> tuple[list[Node], list[Node]]:
        if heuristic is None:
            heuristic = euclidean_distance
        print(f"heuristic in a star pathfinder: {heuristic}")
        return a_star(map, start, goal, heuristic)


def a_star(map: Map, start: Node, goal: Node, heuristic: Callable):
    start_pos: Position = start.position
    goal_pos: Position = goal.position

    frontier = Frontier(start_pos, goal_pos, heuristic)

    came_from = {}
    cost_to_reach_position = {start_pos: 0}

    while not frontier.is_empty():
        current_cost, current = frontier.pop()

        # Skip if this is a stale entry
        if current_cost > cost_to_reach_position[current]:
            continue

        if current == goal_pos:
            path = reconstruct_path(came_from, current)
            order = list(came_from.keys())
            return path, order

        for neighbor in map.get_neighbors(current):
            tentative_cost = current_cost + map.get_cell_value(neighbor)
            if neighbor not in cost_to_reach_position or tentative_cost < cost_to_reach_position[neighbor]:
                came_from[neighbor] = current
                cost_to_reach_position[neighbor] = tentative_cost
                frontier.insert(neighbor, tentative_cost)

    return [], []


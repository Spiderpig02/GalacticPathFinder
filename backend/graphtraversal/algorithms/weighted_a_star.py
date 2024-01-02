from typing import Callable
from graphtraversal.algorithms.pathfinder import Pathfinder
from graphtraversal.map import Map, Node, Position


class WeightedAStarPathfinder(Pathfinder):
    def find_path(
        self, map: Map, start_pos: Position, goal_pos: Position, heuristic: Callable
    ) -> list[Position]:
        # return weighted_a_star(map, heuristic, start_pos, goal_pos)
        raise NotImplementedError("Weighted A* is not implemented yet")

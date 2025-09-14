from pydantic import BaseModel


class Node(BaseModel):
    x: int
    y: int
    weight: int | None = None


class Position(BaseModel):
    x: int
    y: int


class GraphTraversalRequest(BaseModel):
    algorithm: str
    startPoint: Node
    endPoint: Node
    map: list[Node]
    heuristic: str | None = None


class GraphTraversalResponse(BaseModel):
    status: str
    path: list[Position]
    nodeOrder: list[Position]
    timeTaken: float | None = None


class GraphTraversalMethodResponse(BaseModel):
    method: list[str]


class GraphHeuristicsResponse(BaseModel):
    heuristics: list[str]


class GraphHeuristicsRequest(BaseModel):
    method: str

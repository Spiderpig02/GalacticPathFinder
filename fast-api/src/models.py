from pydantic import BaseModel
class Node(BaseModel):
    x: int
    y: int
    weight: int
    
class GraphTraversalRequest(BaseModel):
    algorithm: str
    startPoint: Node
    endPoint: Node
    map: list[Node]
    heuristic: str | None = None
    
class GraphTraversalResponse(BaseModel):
    status: str
    path: list[Node]
    nodeOrder: list[Node]
    timeTaken: float
    
class GraphTraversalMethodResponse(BaseModel):
    method: list[str]
    
class GraphHeuristicsResponse(BaseModel):
    heuristics: list[str]
export interface Node {
  x: number;
  y: number;
  weight: number;
}

export interface PostTraversalProps {
  algorithm: string;
  heuristic: string;
  startPoint: Node;
  endPoint: Node;
  map: Node[];
}

export interface PostTraversalResponse {
  status: string;
  path: Node[];
  nodeOrder: Node[];
}

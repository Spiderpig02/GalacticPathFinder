export interface Node {
  x: number;
  y: number;
  weight: number;
  isPath: boolean;
  isExplored?: boolean;
  isStartPoint?: boolean;
  isEndPoint?: boolean;
}

export interface PostTraversalProps {
  algorithm: string;
  heuristic: string;
  startPoint: Node | null;
  endPoint: Node | null;
  map: Node[];
}

export interface PostTraversalResponse {
  status: string;
  path: Node[];
  nodeOrder: Node[];
}

import axios, { AxiosResponse } from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

interface Node {
  x: number;
  y: number;
  weight: number;
}

interface PostTraversalProps {
  algorithm: string;
  heuristic: string;
  startPoint: Node;
  endPoint: Node;
  map: Node[];
}

interface PostTraversalResponse {
  message: string;
  path: Node[];
  nodeOrder: Node[];
}

export const postTraversal = async ({
  algorithm,
  heuristic,
  startPoint,
  endPoint,
  map,
}: PostTraversalProps): Promise<PostTraversalResponse | null> => {
  try {
    const args: PostTraversalProps = {
      algorithm,
      heuristic,
      startPoint,
      endPoint,
      map,
    };

    const response: AxiosResponse<PostTraversalResponse> = await axios.post(
      apiRoutes.graphTraversal,
      args
    );

    if (response.status === 200) {
      const responseData: PostTraversalResponse = response.data;
      return responseData;
    } else if (response.status === 400) {
      console.error("Error in postTraversal frontend:", response.data.message);
      return null;
    } else if (response.status === 500) {
      console.error("Error in postTraversal backend:", response.data.message);
      return null;
    }

    throw new Error("Unexpected response status");
  } catch (error) {
    console.error("Error in postTraversal:", error);
    return null;
  }
};

import axios, { AxiosResponse } from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";
import { PostTraversalProps, PostTraversalResponse } from "../types.ts";

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
      const responseData = response.data;
      return responseData;
    } else if (response.status === 400) {
      return null;
    } else if (response.status === 500) {
      return null;
    }

    throw new Error("Unexpected response status");
  } catch (error) {
    console.error("Error in postTraversal:", error);
    return null;
  }
};

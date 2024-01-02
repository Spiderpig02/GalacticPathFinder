import axios, { AxiosResponse } from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

export const postGraphHeuristics = async (
  algorithmName: string
): Promise<string[] | null> => {
  try {
    const data = { methods: algorithmName };
    const response: AxiosResponse<string[]> = await axios.post(
      apiRoutes.graphHeuristicsNames,
      data
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error in postGraphHeuristics:", error);
    return null;
  }
};

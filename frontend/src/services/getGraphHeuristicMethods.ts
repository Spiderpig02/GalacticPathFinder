import axios from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";
interface graphHeuristicsResponse {
  traversalNames: string[];
}

export const postGraphHeuristics = async (algorithmName: string) => {
  try {
    const data = { heuristic: algorithmName };
    const response = await axios.post(apiRoutes.graphHeuristicsNames, data);
    return response.data as graphHeuristicsResponse;
  } catch (error) {
    console.error(error);
  }
};

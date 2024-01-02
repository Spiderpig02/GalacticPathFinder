import axios from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

export const postGraphHeuristics = async (algorithmName: string) => {
  try {
    const data = { methods: algorithmName };
    const response = await axios.post(apiRoutes.graphHeuristicsNames, data);
    if (response.status !== 200) {
      throw new Error("Error in postGraphHeuristics");
    }
    return response.data as string[];
  } catch (error) {
    console.error(error);
  }
};

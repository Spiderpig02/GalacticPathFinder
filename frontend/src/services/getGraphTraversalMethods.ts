import axios from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

export const getGraphTraversalMethods = async () => {
  try {
    const response = await axios.get(apiRoutes.graphTraversalNames);
    if (response.status !== 200) {
      throw new Error("Error in getGraphTraversalMethods");
    }
    return response.data as string[];
  } catch (error) {
    console.error(error);
  }
};

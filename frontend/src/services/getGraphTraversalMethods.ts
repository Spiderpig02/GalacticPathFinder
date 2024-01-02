import axios from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";
interface graphTraversalNamesResponse {
  traversalNames: string[];
}
export const getGraphTraversalMethods = async () => {
  try {
    const response = await axios.get(apiRoutes.graphTraversalNames);
    return response.data as graphTraversalNamesResponse;
  } catch (error) {
    console.error(error);
  }
};

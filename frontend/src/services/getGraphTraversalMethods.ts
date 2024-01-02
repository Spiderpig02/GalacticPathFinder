import axios from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

export const getGraphTraversalMethods = async () => {
  const response = await axios.get(apiRoutes.graphTraversalNames);
  return response.data;
};

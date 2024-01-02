import axios, { AxiosResponse } from "axios";
import { apiRoutes } from "../routes/routeDefinitions.ts";

export const getGraphTraversalMethods = async (): Promise<string[] | null> => {
  try {
    const response: AxiosResponse<string[]> = await axios.get(
      apiRoutes.graphTraversalNames
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error in getGraphTraversalMethods:", error);
    return null;
  }
};

const baseAPIUrl: string =
  (import.meta.env.VITE_BACKEND_URL as string) ??
  "https://backend.galacticpathfinder.com";

const routes = {};

const apiRoutes = {
  graphTraversalNames: `${baseAPIUrl}/graphtraversal/graph-traversal-methods`,
  graphTraversal: `${baseAPIUrl}/graphtraversal/traverse`,
  graphHeuristicsNames: `${baseAPIUrl}/graphtraversal/graph-heuristics-methods`,
};

export { routes, apiRoutes };

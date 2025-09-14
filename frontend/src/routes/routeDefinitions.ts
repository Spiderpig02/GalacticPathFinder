const baseAPIUrl: string =
  (import.meta.env.VITE_BACKEND_URL as string) ?? "http://127.0.0.1:8000";

const routes = {};

const apiRoutes = {
  graphTraversalNames: `${baseAPIUrl}/graphtraversal/graph-traversal-methods`,
  graphTraversal: `${baseAPIUrl}/graphtraversal/traverse`,
  graphHeuristicsNames: `${baseAPIUrl}/graphtraversal/graph-heuristics-methods`,
};

export { routes, apiRoutes };

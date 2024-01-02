const baseAPIUrl: string = "http://localhost:8080/api";

const routes = {};

const apiRoutes = {
  graphTraversalNames: `${baseAPIUrl}/graph-traversal-methods`,
  graphTraversal: `${baseAPIUrl}/traverse`,
  graphHeuristicsNames: `${baseAPIUrl}/graph-heuristics-methods`,
};

export { routes, apiRoutes };

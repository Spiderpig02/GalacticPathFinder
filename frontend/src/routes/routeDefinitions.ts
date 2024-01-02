const baseAPIUrl: string = "http://127.0.0.1:8000/graphtraversal";

const routes = {};

const apiRoutes = {
  graphTraversalNames: `${baseAPIUrl}/graph-traversal-methods`,
  graphTraversal: `${baseAPIUrl}/traverse`,
  graphHeuristicsNames: `${baseAPIUrl}/graph-heuristics-methods`,
};

export { routes, apiRoutes };

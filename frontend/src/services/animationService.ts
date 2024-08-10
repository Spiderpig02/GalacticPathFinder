import { endPoint, startPoint, tiles } from "../components/mapGrid/MapGrid";
import {
  selectedAlgorithm,
  selectedHeuristic,
  animationSpeed,
} from "../pages/homePage/HomePage";
import { PostTraversalProps, PostTraversalResponse } from "../types";
import { postTraversal } from "./postTraversal";
import { Node } from "../types";

export const handleTraverse = () => {
  console.log("Traversing the grid");
  console.log("Steps per second: ", animationSpeed.value);

  const postTraversalProps: PostTraversalProps = {
    algorithm: selectedAlgorithm.value,
    heuristic: selectedHeuristic.value,
    startPoint: startPoint.value,
    endPoint: endPoint.value,
    map: tiles.value,
  };

  console.log(postTraversalProps);
  postTraversal(postTraversalProps)
    .then((res: PostTraversalResponse | null) => {
      if (res) {
        console.log("Response from postTraversal: ", res);
        if (res.status === "success") {
          try {
            // Parse the path and nodeOrder JSON strings into arrays
            const parsedPath: Node[] = JSON.parse(res.path);
            const parsedNodeOrder: Node[] = JSON.parse(res.nodeOrder);

            // Place the path on the grid
            placePath(parsedPath);
          } catch (err) {
            console.error("Error parsing path or nodeOrder: ", err);
          }
        }
      }
    })
    .catch((err) => console.log(err));
};

const placePath = (path: Node[]) => {
  if (!Array.isArray(path)) {
    console.error("Invalid path: ", path);
    return;
  }

  // Update the tiles signal to mark the path with weight = 1
  tiles.value = tiles.value.map((tile) => {
    // Check if the tile is part of the path
    const isPathTile = path.some(
      (pathNode) => pathNode.x === tile.x && pathNode.y === tile.y
    );
    return isPathTile ? { ...tile, weight: -2 } : tile;
  });

  console.log("Placing path: ", path);
};

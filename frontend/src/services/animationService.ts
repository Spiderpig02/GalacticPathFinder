import { endPoint, startPoint, tiles } from "../components/mapGrid/MapGrid";
import {
  selectedAlgorithm,
  selectedHeuristic,
  animationSpeed,
} from "../pages/homePage/HomePage";
import { PostTraversalProps, PostTraversalResponse } from "../types";
import { postTraversal } from "./postTraversal";
import { Node } from "../types";

let timeoutIds: number[] = [];

export const handleTraverse = () => {
  console.log("Traversing the grid");
  console.log("Steps per second: ", animationSpeed.value);

  // Clear any existing timeouts before starting a new animation
  clearPreviousAnimations();

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

            // Animate node exploration
            animateNodeOrder(parsedNodeOrder, () => {
              // After node exploration, animate the path
              animatePath(parsedPath);
            });
          } catch (err) {
            console.error("Error parsing path or nodeOrder: ", err);
          }
        }
      }
    })
    .catch((err) => console.log(err));
};

const clearPreviousAnimations = () => {
  // Clear all timeouts stored in the timeoutIds array
  timeoutIds.forEach(clearTimeout);
  timeoutIds = []; // Reset the array
};

// Function to animate the nodeOrder
const animateNodeOrder = (nodeOrder: Node[], callback: () => void) => {
  const delay = 10 / (animationSpeed.value * 100); // Calculate delay based on steps per second

  nodeOrder.forEach((node, index) => {
    const timeoutId = setTimeout(() => {
      tiles.value = tiles.value.map((tile) => {
        if (tile.x === node.x && tile.y === node.y) {
          return { ...tile, isPath: false, isExplored: true }; // Mark as explored
        }
        return tile;
      });

      // If this is the last node, call the callback to start animating the path
      if (index === nodeOrder.length - 1) {
        callback();
      }
    }, index * delay); // Apply calculated delay

    timeoutIds.push(timeoutId); // Store timeout ID
  });
};

// Function to animate the path
const animatePath = (path: Node[]) => {
  const delay = 5 / (animationSpeed.value * 100); // Adjusted delay for the path animation, can be a different factor

  path.forEach((node, index) => {
    const timeoutId = setTimeout(() => {
      tiles.value = tiles.value.map((tile) => {
        if (tile.x === node.x && tile.y === node.y) {
          return { ...tile, isPath: true, weight: 1 }; // Mark as part of the path
        }
        return tile;
      });
    }, index * delay); // Apply calculated delay

    timeoutIds.push(timeoutId); // Store timeout ID
  });
};

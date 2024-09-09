/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  endPoint,
  startPoint,
  tiles,
  aspectRatio,
} from "../components/mapGrid/MapGrid";
import {
  selectedAlgorithm,
  selectedHeuristic,
  animationSpeed,
  algorithmStepSliderSignal,
  mapSizeSliderSignal,
  showToastSignal,
} from "../pages/homePage/HomePage";
import { PostTraversalProps, PostTraversalResponse } from "../types";
import { postTraversal } from "./postTraversal";
import { Node } from "../types";
import { clearSignal } from "../components/startAndEndPointsButton/StartAndEndPointsButton";

let timeoutIds: number[] = [];
let nodeOrder: Node[] = [];
let path: Node[] = [];

export const handleTraverse = (onAnimationStart: () => void) => {
  console.log("Traversing the grid");
  console.log("Steps per second: ", animationSpeed.value);

  // Clear any existing timeouts before starting a new animation
  clearPreviousAnimations();

  // Only send the visible tiles to the backend

  const map = tiles.value.filter(
    (tile) =>
      tile.x < mapSizeSliderSignal.value &&
      tile.y < Math.round(mapSizeSliderSignal.value * aspectRatio)
  );
  const postTraversalProps: PostTraversalProps = {
    algorithm: selectedAlgorithm.value,
    heuristic: selectedHeuristic.value,
    startPoint: startPoint.value,
    endPoint: endPoint.value,
    map: map,
  };

  console.log(postTraversalProps);
  postTraversal(postTraversalProps)
    .then((res: PostTraversalResponse | null) => {
      if (res) {
        console.log("Response from postTraversal: ", res);
        if (res.status === "success") {
          try {
            // Parse the path and nodeOrder JSON strings into arrays
            path = JSON.parse(res.path);
            nodeOrder = JSON.parse(res.nodeOrder);
            console.log("NodeOrder = ", nodeOrder);

            // Create a copy of the signal and update min, max, and currentValue
            const updatedSignal = { ...algorithmStepSliderSignal.value };
            updatedSignal.currentValue = 0;
            updatedSignal.min = 0;
            updatedSignal.max = nodeOrder.length + path.length - 1;
            algorithmStepSliderSignal.value = updatedSignal;

            // Call the callback to indicate the animation is starting
            onAnimationStart();

            // Animate node exploration
            animateNodeOrder(nodeOrder, () => {
              // After node exploration, animate the path
              animatePath(path);
            });
          } catch (err) {
            console.error("Error parsing path or nodeOrder: ", err);
          }
        } else {
          showToastSignal.value = true;
          onAnimationStart();
        }
      }
    })
    .catch((err) => console.log(err));
};

export const clearPreviousAnimations = () => {
  // Clear all timeouts stored in the timeoutIds array
  timeoutIds.forEach(clearTimeout);
  timeoutIds = []; // Reset the array
};

// Function to render a specific step
export const renderStep = (step: number) => {
  // Reset all tiles first
  tiles.value = tiles.value.map((tile) => ({
    ...tile,
    isExplored: false,
    isPath: false,
    weight: tile.weight >= 1 || tile.weight === -1 ? tile.weight : 0,
  }));

  // First, render all the explored nodes up to the point of the nodeOrder
  tiles.value = tiles.value.map((tile) => {
    for (let i = 0; i < Math.min(step, nodeOrder.length); i++) {
      const node = nodeOrder[i];
      if (node && tile.x === node.x && tile.y === node.y) {
        return { ...tile, isExplored: true };
      }
    }
    return tile;
  });

  // Then, if the step is beyond the nodeOrder length, render the path
  if (step >= nodeOrder.length) {
    tiles.value = tiles.value.map((tile) => {
      for (let i = 0; i < step - nodeOrder.length; i++) {
        const node = path[i];
        if (node && tile.x === node.x && tile.y === node.y) {
          return { ...tile, isPath: true, weight: 0 };
        }
      }
      return tile;
    });
  }
};

// Function to animate the nodeOrder
const animateNodeOrder = (nodeOrder: Node[], callback: () => void) => {
  const delay = 10 / (animationSpeed.value * 100); // Calculate delay based on steps per second

  nodeOrder.forEach((node, index) => {
    const timeoutId = window.setTimeout(() => {
      // Check if the current index matches the slider value
      if (index === algorithmStepSliderSignal.value.currentValue) {
        tiles.value = tiles.value.map((tile) => {
          if (tile.x === node.x && tile.y === node.y) {
            return { ...tile, isPath: false, isExplored: true }; // Mark as explored
          }
          return tile;
        });

        // Increment the algorithm step slider signal
        const updatedSignal = { ...algorithmStepSliderSignal.value };
        updatedSignal.currentValue += 1;
        algorithmStepSliderSignal.value = updatedSignal;

        // If this is the last node, call the callback to start animating the path
        if (index === nodeOrder.length - 1) {
          callback();
        }
      }
    }, index * delay); // Apply calculated delay

    timeoutIds.push(timeoutId); // Store timeout ID
  });
};

// Function to animate the path
const animatePath = (path: Node[]) => {
  const delay = 5 / (animationSpeed.value * 100); // Adjusted delay for the path animation, can be a different factor

  path.forEach((node, index) => {
    const timeoutId = window.setTimeout(() => {
      tiles.value = tiles.value.map((tile) => {
        if (tile.x === node.x && tile.y === node.y) {
          return { ...tile, isPath: true, weight: 1 }; // Mark as part of the path
        }
        return tile;
      });

      // Increment the algorithm step slider signal
      const updatedSignal = { ...algorithmStepSliderSignal.value };
      updatedSignal.currentValue += 1;
      algorithmStepSliderSignal.value = updatedSignal;
    }, index * delay); // Apply calculated delay

    timeoutIds.push(timeoutId); // Store timeout ID
  });
};

/**
 * Reset the grid to its initial state by clearing any previous animations and resetting the tiles
 */
export const resetGrid = () => {
  clearPreviousAnimations();
  clearSignal.value = !clearSignal.value;
  tiles.value = tiles.value.map((tile) => {
    return {
      ...tile,
      isExplored: false,
      isPath: false,
      weight: 0,
    };
  });
};

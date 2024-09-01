import React from "react";
import DefaultButton from "../defaultButton/DefaultButton";
import "./GenerateObstacleButtons.css";
// @ts-ignore
import { Noise } from "noisejs";
import { tiles } from "../mapGrid/MapGrid";
import { mapSizeSliderSignal } from "../../pages/homePage/HomePage";

type NoiseType = {
  perlin2(x: number, y: number): number;
};

const GenerateObstacleButtons: React.FC = () => {
  const handleGenerateObstacles = () => {
    // @ts-ignore
    const noise = new Noise(Math.random()) as unknown as NoiseType;
    const numOfColumns = mapSizeSliderSignal.value; // Get the current number of columns from the slider
    const height = Math.round(numOfColumns * (9 / 16)); // Set aspect ratio of grid to 16:9

    const scale = 0.2; // Adjust the scale to control the frequency of obstacles

    // Only modify the tiles that are within the viewable grid (based on the current mapSizeSliderSignal-value)
    const updatedTiles = tiles.value.map((tile) => {
      if (tile.x < numOfColumns && tile.y < height) {
        const noiseValue = noise.perlin2(tile.x * scale, tile.y * scale);
        const isObstacle = noiseValue > 0.1 ? -1 : 0; // Adjust threshold as needed
        return { ...tile, weight: isObstacle };
      }
      return tile; // Leave tiles outside the viewable area unchanged
    });

    tiles.value = updatedTiles;

    console.log("Generated obstacles");
  };

  const handleGenerateMaze = () => {
    const numOfColumns = mapSizeSliderSignal.value;
    const height = Math.round(numOfColumns * (9 / 16));

    // Initialize a grid of unvisited cells
    const unvisited = new Set(tiles.value.map((tile) => `${tile.x}-${tile.y}`));

    // Helper function to get neighbors
    const getNeighbors = (x: number, y: number) => {
      const neighbors = [];
      if (x > 0 && unvisited.has(`${x - 2}-${y}`)) neighbors.push([x - 2, y]);
      if (x < numOfColumns - 1 && unvisited.has(`${x + 2}-${y}`))
        neighbors.push([x + 2, y]);
      if (y > 0 && unvisited.has(`${x}-${y - 2}`)) neighbors.push([x, y - 2]);
      if (y < height - 1 && unvisited.has(`${x}-${y + 2}`))
        neighbors.push([x, y + 2]);
      return neighbors;
    };

    // Start with a random cell
    const stack = [];
    const startX = Math.floor(Math.random() * Math.floor(numOfColumns / 2)) * 2;
    const startY = Math.floor(Math.random() * Math.floor(height / 2)) * 2;
    stack.push([startX, startY]);
    unvisited.delete(`${startX}-${startY}`);

    // Accumulate changes to apply them after the loop
    const updatedTiles = tiles.value.map((tile) => {
      // Initially set all tiles as obstacles (walls)
      return { ...tile, weight: -1 };
    });

    // Maze generation using backtracking
    while (stack.length > 0) {
      const [x, y] = stack[stack.length - 1];
      const neighbors = getNeighbors(x, y);

      if (neighbors.length > 0) {
        // Choose a random neighbor
        const [nextX, nextY] =
          neighbors[Math.floor(Math.random() * neighbors.length)];

        // Remove the wall between the current cell and the chosen neighbor
        const wallX = x + (nextX - x) / 2;
        const wallY = y + (nextY - y) / 2;

        // Update the tiles array locally
        updatedTiles.forEach((tile, index) => {
          if (tile.x === x && tile.y === y) {
            updatedTiles[index] = { ...tile, weight: 0 }; // Mark as part of the maze path
          } else if (tile.x === wallX && tile.y === wallY) {
            updatedTiles[index] = { ...tile, weight: 0 }; // Carve out the wall
          } else if (tile.x === nextX && tile.y === nextY) {
            unvisited.delete(`${nextX}-${nextY}`);
            stack.push([nextX, nextY]);
            updatedTiles[index] = { ...tile, weight: 0 }; // Mark as part of the maze path
          }
        });
      } else {
        stack.pop(); // Backtrack
      }
    }

    // Apply all changes at once
    tiles.value = updatedTiles;

    console.log("Generated maze");
  };

  return (
    <div className="generate-obstacles-buttons-container">
      <DefaultButton
        text={"Generate obstacles"}
        onClick={handleGenerateObstacles}
      />
      <DefaultButton text={"Generate maze"} onClick={handleGenerateMaze} />
    </div>
  );
};

export default GenerateObstacleButtons;

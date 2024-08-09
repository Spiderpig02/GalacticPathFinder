/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import DefaultButton from "../components/defaultButton/DefaultButton";
import { Noise } from "noisejs";
import "./GenerateObstacleButtons.css";
import { tiles } from "../components/mapGrid/MapGrid";
import { mapSizeSliderSignal } from "../pages/homePage/HomePage";

type NoiseType = {
  perlin2(x: number, y: number): number;
};

const GenerateObstacleButtons: React.FC = () => {
  const handleGenerateObstacles = () => {
    const noise = new Noise(Math.random()) as NoiseType;

    const numOfColumns = mapSizeSliderSignal.value; // Get the current number of columns from the slider
    const height = Math.round(numOfColumns * (9 / 16)); // Set aspect ratio of grid to 16:9

    const scale = 0.2; // Adjust the scale to control the frequency of obstacles

    // Only modify the tiles that are within the viewable grid (based on the current mapSizeSliderSignal-value)
    tiles.value = tiles.value.map((tile) => {
      if (tile.x < height && tile.y < numOfColumns) {
        const noiseValue = noise.perlin2(tile.x * scale, tile.y * scale);
        const isObstacle = noiseValue > 0.1 ? 1 : 0; // Adjust threshold as needed
        return { ...tile, weight: isObstacle };
      }
      return tile; // Leave tiles outside the viewable area unchanged
    });

    console.log("Generated obstacles");
  };

  const handleGenerateMaze = () => {
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

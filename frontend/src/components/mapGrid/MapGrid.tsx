/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { sliderSignal } from "../../pages/HomePage.tsx";
import Tile from "../Tile.tsx";
import "./MapGrid.css";
import { selectionModeSignal } from "../StartAndEndPointsButton.tsx";
import { Node } from "../../types.ts";
import { signal } from "@preact/signals-react";

// Track the state of each tile
// Note to self: Signals must be outside components in order to trigget correct re-rendering/component updates
export const tiles = signal<Node[]>([]);

const MapGrid = () => {
  const numOfColumns = sliderSignal.value; // Get the current size of the grid
  const height = Math.round(numOfColumns * (9 / 16)); // Set aspect ratio of grid to 16:9
  const tileWidth = 80 / numOfColumns; // 80 is the width of the grid container
  const tileHeight = 80 / height; // 80 is the height of the grid container

  // State to track the start and end point
  const [startPoint, setStartPoint] = useState<Node | null>(null);
  const [endPoint, setEndPoint] = useState<Node | null>(null);

  // States to handle the placing of obstacles
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialDragState, setInitialDragState] = useState<boolean | null>(
    null
  );

  // Update the content of the grid whenever the number of columns changes (i.e. when the slider is moved)
  useEffect(() => {
    const newTiles: Node[] = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < numOfColumns; col++) {
        const existingTile = tiles
          .peek()
          .find((tile) => tile.x === row && tile.y === col);
        newTiles.push(existingTile || { x: row, y: col, weight: 0 });
      }
    }
    tiles.value = newTiles;
  }, [sliderSignal.value, height]);

  // Check if a tile is active
  const isTileActive = (row: number, col: number) => {
    return tiles.value.some(
      (tile) => tile.x === row && tile.y === col && tile.weight === 1
    );
  };

  // Handle dragging the mouse to toggle tiles
  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    setInitialDragState(isTileActive(row, col));
  };

  // Handle dragging the mouse to toggle tiles
  const handleTileEnter = useCallback(
    (row: number, col: number) => {
      if (isMouseDown) {
        tiles.value = tiles.value.map((tile) =>
          tile.x === row && tile.y === col
            ? { ...tile, weight: initialDragState ? 0 : 1 }
            : tile
        );
      }
    },
    [isMouseDown, initialDragState]
  );

  // Handle clicking a tile to toggle it
  const handleTileClick = (row: number, col: number) => {
    // Place start or end point
    if (selectionModeSignal.value) {
      if (!startPoint) {
        setStartPoint({ x: row, y: col, weight: 1 });
      } else if (!endPoint) {
        setEndPoint({ x: row, y: col, weight: 1 });
        selectionModeSignal.value = false;
      }
    }
    // Place obstacle
    else {
      tiles.value = tiles.value.map((tile) =>
        tile.x === row && tile.y === col
          ? { ...tile, weight: tile.weight === 1 ? 0 : 1 }
          : tile
      );
    }
  };

  // Is this really needed now that the tiles-state is a list of Node-objects?
  const getGrid = (): Node[] => {
    return tiles.value;
  };

  return (
    <div
      className="grid-container"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="grid">
        {Array.from({ length: height }).map((_, row) => (
          <div key={row} className="flex">
            {Array.from({ length: numOfColumns }).map((_, col) => (
              <Tile
                key={`${row}-${col}`}
                width={tileWidth}
                height={tileHeight}
                isActive={isTileActive(row, col)}
                onTileEnter={() => handleTileEnter(row, col)}
                onTileClick={() => handleTileClick(row, col)}
                onMouseDown={() => handleMouseDown(row, col)}
                isStartPoint={startPoint?.x === row && startPoint?.y === col}
                isEndPoint={endPoint?.x === row && endPoint?.y === col}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapGrid;

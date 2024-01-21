/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { sliderSignal } from "../../pages/HomePage.tsx";
import Tile from "../Tile.tsx";
import "./MapGrid.css";
import { selectionModeSignal } from "../StartAndEndPointsButton.tsx";
import { Node as traversalNode } from "../../types.ts";

const MapGrid = () => {
  const size = sliderSignal.value; // Get the current size of the grid
  const height = Math.round(size * (9 / 16)); // Set aspect ratio of grid to 16:9
  const tileWidth = 80 / size; // 80 is the width of the grid container
  const tileHeight = 80 / height; // 80 is the height of the grid container

  // State to track the start and end point
  const [startPoint, setStartPoint] = useState<string | null>(null);
  const [endPoint, setEndPoint] = useState<string | null>(null);

  // Create a state to track the active state of each tile
  const [activeTiles, setActiveTiles] = useState(() => {
    const tiles: { [key: string]: boolean } = {};
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < size; col++) {
        tiles[`${row}-${col}`] = false;
      }
    }
    return tiles;
  });

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialDragState, setInitialDragState] = useState<boolean | null>(
    null
  );

  // Handle dragging the mouse to toggle tiles
  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    setInitialDragState(activeTiles[`${row}-${col}`]);
  };

  // Handle dragging the mouse to toggle tiles
  const handleTileEnter = useCallback(
    (row: number, col: number) => {
      if (isMouseDown) {
        setActiveTiles((prev) => ({
          ...prev,
          [`${row}-${col}`]: initialDragState ? false : true,
        }));
      }
    },
    [isMouseDown, initialDragState]
  );

  // Handle clicking a tile to toggle it
  const handleTileClick = (row: number, col: number) => {
    console.log("selectionModeSignal.value = ", selectionModeSignal.value);
    if (selectionModeSignal.value) {
      if (!startPoint) {
        setStartPoint(`${row}-${col}`);
      } else if (!endPoint) {
        setEndPoint(`${row}-${col}`);
        selectionModeSignal.value = false;
      }
    } else {
      console.log("Er her");
      setActiveTiles((prev) => ({
        ...prev,
        [`${row}-${col}`]: !prev[`${row}-${col}`],
      }));
    }
  };

  const getGrid = (): traversalNode[] => {
    const grid: traversalNode[] = [];
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < size; col++) {
        if (activeTiles[`${row}-${col}`]) {
          grid.push({ x: row, y: col, weight: 0 });
        }
      }
    }
    return grid;
  };

  // Render the grid of tiles
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < height; row++) {
      const currentRow = [];
      for (let col = 0; col < size; col++) {
        currentRow.push(
          <Tile
            key={`${row}-${col}`}
            width={tileWidth}
            height={tileHeight}
            isActive={activeTiles[`${row}-${col}`]}
            onTileEnter={() => handleTileEnter(row, col)}
            onTileClick={() => handleTileClick(row, col)}
            onMouseDown={() => handleMouseDown(row, col)}
            isStartPoint={startPoint === `${row}-${col}`}
            isEndPoint={endPoint === `${row}-${col}`}
          />
        );
      }
      grid.push(
        <div key={row} className="flex">
          {currentRow}
        </div>
      );
    }
    return grid;
  };

  return (
    <div
      className="grid-container"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="grid">{renderGrid()}</div>
    </div>
  );
};

export default MapGrid;

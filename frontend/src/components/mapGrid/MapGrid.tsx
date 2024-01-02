/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { sliderSignal } from "../../pages/HomePage.tsx";
import Tile from "../Tile.tsx";
import "./MapGrid.css";

const MapGrid = () => {
  const size = sliderSignal.value;
  const height = Math.round(size * (9 / 16));
  const tileWidth = 80 / size;
  const tileHeight = 80 / height;

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

  // Modify mouse down handler to set initial drag state
  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    setInitialDragState(activeTiles[`${row}-${col}`]);
  };

  // Update the tile enter function
  const handleTileEnter = useCallback(
    (row: number, col: number) => {
      if (isMouseDown) {
        // Check against the initial drag state
        setActiveTiles((prev) => ({
          ...prev,
          [`${row}-${col}`]: initialDragState ? false : true,
        }));
      }
    },
    [isMouseDown, initialDragState]
  );

  const handleTileClick = (row: number, col: number) => {
    // Toggles the tile regardless of the mouse down state
    setActiveTiles((prev) => ({
      ...prev,
      [`${row}-${col}`]: !prev[`${row}-${col}`],
    }));
  };

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

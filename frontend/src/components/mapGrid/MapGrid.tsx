/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { mapSizeSliderSignal } from "../../pages/homePage/HomePage.tsx";
import Tile from "../gridTile/GridTile.tsx";
import "./MapGrid.css";
import { selectionModeSignal } from "../startAndEndPointsButton/StartAndEndPointsButton.tsx";
import { Node } from "../../types.ts";
import { signal } from "@preact/signals-react";
import { tileWeightSignal } from "../textAndSelect/TextAndSelect.tsx";

// Track the state of each tile
// Note to self: Signals must be outside components in order to trigget correct re-rendering/component updates
export const tiles = signal<Node[]>([]);
export const startPoint = signal<Node>({
  x: 0,
  y: 0,
  weight: 0,
  isPath: false,
});
export const endPoint = signal<Node>({ x: 0, y: 10, weight: 0, isPath: false });

const MapGrid = () => {
  const maxNumOfColumns = 80; // Maximum number of columns
  const maxHeight = Math.round(maxNumOfColumns * (9 / 16)); // Maximum height of the grid

  const numOfColumns = mapSizeSliderSignal.value; // Get the current size of the grid
  const height = Math.round(numOfColumns * (9 / 16)); // Set aspect ratio of grid to 16:9
  const tileWidth = 80 / numOfColumns; // 80 is the width of the grid container
  const tileHeight = 80 / height; // 80 is the height of the grid container

  // State to track the start and end point
  const [startPointTemp, setStartPoint] = useState<Node | null>(null);
  const [endPointTemp, setEndPoint] = useState<Node | null>(null);

  // States to handle the placing of obstacles
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [initialDragState, setInitialDragState] = useState<boolean | null>(
    null
  );

  // Initialize the grid, always keep track of all tiles regardless of viewable grid-size, i.e. value of mapSizeSliderSignal-signal
  useEffect(() => {
    // Check if the tiles array has been initialized
    if (tiles.value.length === 0) {
      // Initialize the tiles array with all possible tiles
      const newTiles: Node[] = [];
      for (let row = 0; row < maxHeight; row++) {
        for (let col = 0; col < maxNumOfColumns; col++) {
          newTiles.push({ x: col, y: row, weight: 0, isPath: false });
        }
      }
      tiles.value = newTiles;
    }
  }, []);

  // Check if a tile is active
  const isTileActive = (row: number, col: number) => {
    const tile = tiles.value.find((tile) => tile.x === col && tile.y === row);
    return tile ? tile.weight === -1 : false;
  };

  const getTileWeight = (row: number, col: number) => {
    const tile = tiles.value.find((tile) => tile.x === col && tile.y === row);
    return tile ? tile.weight : 0;
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
          tile.x === col && tile.y === row
            ? { ...tile, weight: initialDragState ? 0 : tileWeightSignal.value }
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
      if (!startPointTemp) {
        setStartPoint({ x: col, y: row, weight: 0, isPath: false });
        startPoint.value = { x: col, y: row, weight: 0, isPath: false };
      } else if (!endPointTemp) {
        setEndPoint({ x: col, y: row, weight: 0, isPath: false });
        endPoint.value = { x: col, y: row, weight: 0, isPath: false };
        selectionModeSignal.value = false;
      }
    }
    // Place obstacle
    else {
      tiles.value = tiles.value.map((tile) =>
        tile.x === col && tile.y === row
          ? { ...tile, weight: tileWeightSignal.value }
          : tile
      );
    }
  };

  const getIsPath = (row: number, col: number) => {
    return tiles.value.find((tile) => tile.x === col && tile.y === row)?.isPath;
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
                key={`${col}-${row}`}
                width={tileWidth}
                height={tileHeight}
                weight={getTileWeight(row, col)}
                isPath={getIsPath(row, col)}
                onTileEnter={() => handleTileEnter(row, col)}
                onTileClick={() => handleTileClick(row, col)}
                onMouseDown={() => handleMouseDown(row, col)}
                isStartPoint={
                  startPointTemp?.x === col && startPointTemp?.y === row
                }
                isEndPoint={endPointTemp?.x === col && endPointTemp?.y === row}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapGrid;

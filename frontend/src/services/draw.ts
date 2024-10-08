import { endPoint, startPoint, tiles } from "../components/mapGrid/MapGrid";

export const handleClearEarlierTraversals = () => {
  tiles.value = tiles.value.map((tile) => {
    if (tile.isPath || tile.isExplored) {
      return { ...tile, weight: 0, isPath: false, isExplored: false };
    }
    return tile;
  });
};

export const clearMap = () => {
  // Reset all tiles' isPath and isExplored properties
  tiles.value = tiles.value.map((tile) => ({
    ...tile,
    isPath: false,
    isExplored: false,
  }));

  // Reset start and end points signal-values
  startPoint.value = null;
  endPoint.value = null;

  console.log("Map cleared");
};

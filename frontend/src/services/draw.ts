import { tiles } from "../components/mapGrid/MapGrid";

export const handleClearEarlierTraversals = () => {
  tiles.value = tiles.value.map((tile) => {
    if (tile.isPath || tile.isExplored) {
      return { ...tile, weight: 0, isPath: false, isExplored: false };
    }
    return tile;
  });
};

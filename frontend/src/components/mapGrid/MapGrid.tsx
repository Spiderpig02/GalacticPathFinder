import { sliderSignal } from "../../pages/HomePage.tsx";
import Tile from "../Tile.tsx";
import "./MapGrid.css";

const MapGrid = () => {
  const size = sliderSignal.value;
  const height = Math.round(size * (9 / 16));

  // Calculate tile dimensions
  const tileWidth = 80 / size; // 80vw divided by the number of columns
  const tileHeight = 80 / height; // 80vh divided by the number of rows

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < height; row++) {
      const currentRow = [];
      for (let col = 0; col < size; col++) {
        currentRow.push(
          <Tile key={`${row}-${col}`} width={tileWidth} height={tileHeight} />
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
    <div className="grid-container">
      <div className="grid">{renderGrid()}</div>
    </div>
  );
};

export default MapGrid;

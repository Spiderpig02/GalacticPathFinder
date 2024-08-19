type GridTileProps = {
  width: number;
  height: number;
  weight: number;
  isPath: boolean;
  isExplored?: boolean;
  onTileEnter: () => void;
  onTileClick: () => void;
  onMouseDown: () => void;
  isStartPoint: boolean;
  isEndPoint: boolean;
};

const GridTile = ({
  width,
  height,
  weight,
  isPath,
  onTileEnter,
  onTileClick,
  onMouseDown,
  isStartPoint,
  isEndPoint,
  isExplored,
}: GridTileProps) => {
  let backgroundColor;

  if (isStartPoint) {
    backgroundColor = "green";
  } else if (isEndPoint) {
    backgroundColor = "red";
  } else if (isPath) {
    backgroundColor = "blue";
  } else if (isExplored) {
    backgroundColor = "#08c5df"; // Color explored nodes light blue
  } else {
    switch (weight) {
      case -1:
        backgroundColor = "#050a06";
        break;
      case 1:
        backgroundColor = "#5c1c1c";
        break;
      case 2:
        backgroundColor = "#4c1c1c";
        break;
      case 3:
        backgroundColor = "#3c1c1c";
        break;
      case 4:
        backgroundColor = "#2c1c1c";
        break;
      case 5:
        backgroundColor = "#1c1c1c";
        break;
      default:
        backgroundColor = "white";
        break;
    }
  }

  const tileStyle = {
    width: `${width}vw`,
    height: `${height}vh`,
    border: "0.5px solid",
    backgroundColor: backgroundColor,
  };

  return (
    <button
      style={tileStyle}
      onMouseEnter={onTileEnter}
      onClick={onTileClick}
      onMouseDown={onMouseDown}
    ></button>
  );
};

export default GridTile;

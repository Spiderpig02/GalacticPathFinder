type GridTileProps = {
  width: number;
  height: number;
  weight: number;
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
  onTileEnter,
  onTileClick,
  onMouseDown,
  isStartPoint,
  isEndPoint,
}: GridTileProps) => {
  let backgroundColor;

  switch (weight) {
    case -1:
      backgroundColor = "#050a06";
      break;
    case -2:
      backgroundColor = "#668843";
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

  if (isStartPoint) backgroundColor = "green";
  if (isEndPoint) backgroundColor = "red";

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

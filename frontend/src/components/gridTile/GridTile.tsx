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
      backgroundColor = "black";
      break;
    case 1:
      backgroundColor = "darkgrey";
      break;
    case 2:
      backgroundColor = "grey";
      break;
    case 3:
      backgroundColor = "lightgrey";
      break;
    case 4:
      backgroundColor = "white";
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

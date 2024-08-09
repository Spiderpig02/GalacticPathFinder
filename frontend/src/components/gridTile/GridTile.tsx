type GridTileProps = {
  width: number;
  height: number;
  isActive: boolean;
  onTileEnter: () => void;
  onTileClick: () => void;
  onMouseDown: () => void;
  isStartPoint: boolean;
  isEndPoint: boolean;
};

const GridTile = ({
  width,
  height,
  isActive,
  onTileEnter,
  onTileClick,
  onMouseDown,
  isStartPoint,
  isEndPoint,
}: GridTileProps) => {
  let backgroundColor = isActive ? "black" : "white";
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

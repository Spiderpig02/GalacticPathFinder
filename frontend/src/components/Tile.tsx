import { useState } from "react";

type TileProps = {
  width: number;
  height: number;
  isActive: boolean;
  onTileEnter: () => void;
  onTileClick: () => void;
  onMouseDown: () => void;
};
const Tile = ({
  width,
  height,
  isActive,
  onTileEnter,
  onTileClick,
  onMouseDown,
}: TileProps) => {
  const tileStyle = {
    width: `${width}vw`,
    height: `${height}vh`,
    border: "0.5px solid",
    backgroundColor: isActive ? "black" : "white",
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

export default Tile;

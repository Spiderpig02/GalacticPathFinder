import { useState } from "react";

const Tile = ({ width, height }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleTile = () => {
    setIsActive(!isActive);
  };

  const tileStyle = {
    width: `${width}vw`,
    height: `${height}vh`,
    border: "0.5px solid",
    backgroundColor: isActive ? "black" : "white",
  };

  return <button style={tileStyle} onClick={toggleTile}></button>;
};

export default Tile;

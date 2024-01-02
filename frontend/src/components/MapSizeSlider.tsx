import { sliderSignal } from "../pages/HomePage.tsx";
import { useState } from "react";

const MapSizeSlider = () => {
  const [size, setSize] = useState(50);

  const handleSliderChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  const handleCommitChange = () => {
    console.log("Size = ", size);
    sliderSignal.value = size;
  };

  return (
    <input
      type="range"
      min="20"
      max="80"
      value={size}
      className="slider ml-10"
      id="myRange"
      onChange={handleSliderChange}
      onMouseUp={handleCommitChange}
      onKeyUp={handleCommitChange}
    />
  );
};

export default MapSizeSlider;

import React, { useState } from "react";
import "./MapSizeSlider.css";
import { mapSizeSliderSignal } from "../../pages/homePage/HomePage";

const MapSizeSlider = () => {
  const [size, setSize] = useState<number>(mapSizeSliderSignal.value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const handleCommitChange = () => {
    console.log("Size = ", size);
    mapSizeSliderSignal.value = size;
  };

  return (
    <div className="map-size-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust map size
      </label>
      <input
        type="range"
        min="20"
        max="80"
        value={size}
        className="slider"
        id="myRange"
        onChange={handleSliderChange}
        onMouseUp={handleCommitChange}
        onKeyUp={handleCommitChange}
      />
    </div>
  );
};

export default MapSizeSlider;

import React from "react";
import "./MapSizeSlider.css";
import { mapSizeSliderSignal } from "../../pages/homePage/HomePage";
import { useSignal } from "@preact/signals-react";

const MapSizeSlider = () => {
  const size = useSignal(mapSizeSliderSignal);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mapSizeSliderSignal.value = parseInt(e.target.value);
  };

  return (
    <div className="map-size-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust map size ({size.value}x{size.value})
      </label>
      <input
        type="range"
        min={20}
        max={70}
        value={size.value.toString()}
        className="slider"
        id="myRange"
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default MapSizeSlider;

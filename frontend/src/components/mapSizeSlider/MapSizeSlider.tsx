import React from "react";
import "./MapSizeSlider.css";
import { mapSizeSliderSignal } from "../../pages/homePage/HomePage";
import { useSignal } from "@preact/signals-react";

const aspectRatio = 9 / 16;

const MapSizeSlider = () => {
  const size = useSignal(mapSizeSliderSignal);
  const height = Math.round(Number(size.value) * aspectRatio);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mapSizeSliderSignal.value = parseInt(e.target.value);
  };

  return (
    <div className="map-size-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust map size ({size.value}x{height})
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

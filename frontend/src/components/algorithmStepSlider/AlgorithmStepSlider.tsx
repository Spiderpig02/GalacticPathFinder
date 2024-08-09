import React, { useState } from "react";
import "./AlgorithmStepSlider.css";
import { algorithmStepSliderSignal } from "../../pages/homePage/HomePage";

const AlgorithmStepSlider = () => {
  const [size, setSize] = useState<number>(algorithmStepSliderSignal.value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const handleCommitChange = () => {
    console.log("Size = ", size);
    algorithmStepSliderSignal.value = size;
  };

  return (
    <div className="algorithm-step-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust step
      </label>
      <input
        type="range"
        min="0"
        max="50"
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

export default AlgorithmStepSlider;

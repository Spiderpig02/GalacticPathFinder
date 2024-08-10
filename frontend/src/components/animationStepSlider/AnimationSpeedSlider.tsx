import React, { useState } from "react";
import "./AnimationSpeedSlider.css";
import { animationSpeed } from "../../pages/homePage/HomePage";

const AnimationSpeedSlider = () => {
  const [speed, setSpeed] = useState<number>(animationSpeed.value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value));
  };

  const handleCommitChange = () => {
    animationSpeed.value = speed;
  };

  return (
    <div className="animation-speed-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Steps per second {speed}
      </label>
      <input
        type="range"
        min="1"
        max="10"
        value={speed}
        className="slider"
        id="myRange"
        onChange={handleSliderChange}
        onMouseUp={handleCommitChange}
        onKeyUp={handleCommitChange}
      />
    </div>
  );
};

export default AnimationSpeedSlider;

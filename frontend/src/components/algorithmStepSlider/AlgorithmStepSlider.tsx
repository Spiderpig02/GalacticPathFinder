import React, { useState, useEffect } from "react";
import "./AlgorithmStepSlider.css";
import { algorithmStepSliderSignal } from "../../pages/homePage/HomePage";
import {
  clearPreviousAnimations,
  renderStep,
} from "../../services/animationService"; // Import the clear function and renderStep

const AlgorithmStepSlider = () => {
  const [size, setSize] = useState<number>(
    algorithmStepSliderSignal.value.currentValue
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setSize(newValue);

    // Create a copy of the signal and update currentValue
    const updatedSignal = { ...algorithmStepSliderSignal.value };
    updatedSignal.currentValue = newValue;
    algorithmStepSliderSignal.value = updatedSignal;

    // Abort the ongoing animation
    clearPreviousAnimations();

    // Render the specific step based on the slider value
    renderStep(newValue);
  };

  const handleCommitChange = () => {
    const updatedSignal = { ...algorithmStepSliderSignal.value };
    updatedSignal.currentValue = size;
    algorithmStepSliderSignal.value = updatedSignal;
  };

  useEffect(() => {
    // Dynamically update the slider's max value based on the signal's max value
    const slider = document.getElementById("myRange") as HTMLInputElement;
    console.log("Slider = ", slider);
    if (slider) {
      slider.max = algorithmStepSliderSignal.value.max.toString();
      slider.min = algorithmStepSliderSignal.value.min.toString();
    }
  }, [algorithmStepSliderSignal.value.max]);

  useEffect(() => {
    console.log(
      "AlgorithmStepSliderSignal = ",
      algorithmStepSliderSignal.value
    );
  }, [algorithmStepSliderSignal.value]);

  return (
    <div className="algorithm-step-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust step
      </label>
      <input
        type="range"
        min={algorithmStepSliderSignal.value.min}
        max={algorithmStepSliderSignal.value.max}
        value={algorithmStepSliderSignal.value.currentValue}
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

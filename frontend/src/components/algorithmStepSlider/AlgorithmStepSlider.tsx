import React, { useState, useEffect } from "react";
import "./AlgorithmStepSlider.css";
import { algorithmStepSliderSignal } from "../../pages/homePage/HomePage";
import {
  clearPreviousAnimations,
  renderStep,
} from "../../services/animationService";
import { endPoint, startPoint } from "../mapGrid/MapGrid";
import { signal } from "@preact/signals-react";

export const disableAlgorithmStepSliderSignal = signal<boolean>(false);

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
    if (slider) {
      slider.max = algorithmStepSliderSignal.value.max.toString();
      slider.min = algorithmStepSliderSignal.value.min.toString();
    }
  }, [algorithmStepSliderSignal.value.max]);

  return (
    <div className="algorithm-step-slider-container">
      <label htmlFor="myRange" className="slider-label">
        Adjust step (Current: {algorithmStepSliderSignal.value.currentValue})
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
        disabled={
          startPoint.value === null ||
          endPoint.value === null ||
          disableAlgorithmStepSliderSignal.value
        } // Disable slider if start or end point is not set or if disableAlgorithmStepSliderSignal is set to true
      />
    </div>
  );
};

export default AlgorithmStepSlider;

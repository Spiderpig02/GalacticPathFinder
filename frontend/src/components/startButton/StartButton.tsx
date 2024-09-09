import React, { useState } from "react";
import "./StartButton.css";
import { handleTraverse } from "../../services/animationService";
import { handleClearEarlierTraversals } from "../../services/draw";
import {
  selectedAlgorithm,
  errorMessageSignal,
} from "../../pages/homePage/HomePage";
import { endPoint, startPoint } from "../mapGrid/MapGrid";

const StartButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startAnimation = () => {
    if (!selectedAlgorithm.value) {
      errorMessageSignal.value = "Please select an algorithm";
      return;
    }
    if (!startPoint.value || !endPoint.value) {
      errorMessageSignal.value = "Please set both start and end points";
      return;
    }

    setIsLoading(true);
    handleClearEarlierTraversals();
    handleTraverse(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="start-button-container">
      <button className="start-button" onClick={startAnimation}>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="play-icon"
          >
            <path d="M26 20L46 32L26 44V20Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default StartButton;

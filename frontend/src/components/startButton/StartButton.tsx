import React from "react";
import "./StartButton.css";
import { handleTraverse } from "../../services/animationService";
import { tiles } from "../mapGrid/MapGrid";

const StartButton: React.FC = () => {
  const startAnimation = () => {
    handleClearEarlierTraversals();
    handleTraverse();
  };

  const handleClearEarlierTraversals = () => {
    tiles.value = tiles.value.map((tile) => {
      if (tile.isPath) {
        return { ...tile, weight: 0, isPath: false };
      }
      return tile;
    });
  };

  return (
    <div className="start-button-container">
      <button className="start-button" onClick={startAnimation}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="play-icon"
        >
          <circle cx="32" cy="32" r="31" stroke="black" strokeWidth="1.5" />
          <path d="M26 20L46 32L26 44V20Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default StartButton;

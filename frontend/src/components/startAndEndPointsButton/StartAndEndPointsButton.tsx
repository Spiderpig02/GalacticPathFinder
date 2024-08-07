import { signal } from "@preact/signals-react";
import DefaultButton from "../defaultButton/DefaultButton";
import "./StartAndEndPointsButton.css";

export const selectionModeSignal = signal<boolean>(false);

const StartAndEndPointsButton = () => {
  const toggleSelectionMode = () => {
    selectionModeSignal.value = !selectionModeSignal.value;
  };

  return (
    <div className="start-and-end-points-container">
      <p className="start-and-end-points-text">Place start and end points</p>
      <DefaultButton text={"Place points"} onClick={toggleSelectionMode} />
    </div>
  );
};

export default StartAndEndPointsButton;

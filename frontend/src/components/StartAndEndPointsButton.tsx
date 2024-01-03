import { signal } from "@preact/signals-react";

export const selectionModeSignal = signal<boolean>(false);

const StartAndEndPointsButton = () => {
  const toggleSelectionMode = () => {
    selectionModeSignal.value = !selectionModeSignal.value;
  };

  return (
    <button onClick={toggleSelectionMode}>Set start and end points</button>
  );
};

export default StartAndEndPointsButton;

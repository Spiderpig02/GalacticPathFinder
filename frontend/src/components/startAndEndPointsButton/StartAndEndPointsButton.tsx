import { signal } from "@preact/signals-react";
import DefaultButton from "../defaultButton/DefaultButton";
import "./StartAndEndPointsButton.css";

export const selectionModeSignal = signal<boolean>(false);
export const startEndSignal = signal<number>(0);
export const clearSignal = signal<boolean>(false);

const StartAndEndPointsButton = () => {
  const toggleSelectionMode = () => {
    startEndSignal.value = 1;
    clearSignal.value = !clearSignal.value;
    selectionModeSignal.value = !selectionModeSignal.value;
  };

  let style;
  let buttonText = "Place points";
  if (startEndSignal.value === 1) {
    buttonText = "Place start point";
    style =
      "flex w-[270px] h-[50px] rounded-3xl text-black border border-black justify-center items-center gap-2 text-xl cursor-pointer bg-green-500 hover:bg-green-600";
  }
  if (startEndSignal.value === 2) {
    buttonText = "Place end point";
    style =
      "flex w-[270px] h-[50px] rounded-3xl text-black border border-black justify-center items-center gap-2 text-xl cursor-pointer bg-red-500 hover:bg-red-600";
  }

  return (
    <div className="start-and-end-points-container">
      <p className="start-and-end-points-text">Place start and end points</p>
      <DefaultButton
        text={buttonText}
        onClick={toggleSelectionMode}
        overrideStyle={style}
      />
    </div>
  );
};

export default StartAndEndPointsButton;

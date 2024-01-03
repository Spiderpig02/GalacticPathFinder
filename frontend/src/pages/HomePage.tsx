import { signal } from "@preact/signals-react";
import MapGrid from "../components/mapGrid/MapGrid";
import MapSizeSlider from "../components/MapSizeSlider";
import StartAndEndPointsButton from "../components/StartAndEndPointsButton";

export const sliderSignal = signal<number>(50);

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div style={{ height: "fit-content" }}>
        <MapGrid />
      </div>
      <div className="flex h-5 mt-5">
        <MapSizeSlider />
        <StartAndEndPointsButton />
      </div>
    </div>
  );
};

export default HomePage;

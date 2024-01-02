import { signal } from "@preact/signals-react";
import MapGrid from "../components/mapGrid/MapGrid";
import MapSizeSlider from "../components/MapSizeSlider";

export const sliderSignal = signal<number>(50);

const HomePage = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div style={{ height: "fit-content" }}>
        <MapGrid />
      </div>
      <div className="h-5 mt-5">
        <MapSizeSlider />
      </div>
    </div>
  );
};

export default HomePage;

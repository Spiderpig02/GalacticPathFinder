import { signal } from "@preact/signals-react";
import MapGrid from "../components/mapGrid/MapGrid";
import MapSizeSlider from "../components/MapSizeSlider";
import DropDownMenu from "../components/dropdownMenu/DropDownMenu";
import { getGraphTraversalMethods } from "../services/getGraphTraversalMethods";
import { postGraphHeuristics } from "../services/postGraphHeuristicMethods";
import { selectedAlgorithm } from "../components/dropdownMenu/DropDownMenu";
import { useEffect } from "react";

export const sliderSignal = signal<number>(50);
export const algorithms = signal<string>("");
export const heuristics = signal<string>("");

const HomePage = () => {
  console.log(selectedAlgorithm.value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ height: "fit-content" }}>
        <MapGrid />
        <div style={{ height: "1.25rem", marginTop: "1.25rem" }}>
          <MapSizeSlider />
        </div>
      </div>
      {/* lalalala */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "blue",
          width: "100%",
        }}
      >
        <DropDownMenu
          text="Select algorithm"
          serviceHook={getGraphTraversalMethods}
        />
        <DropDownMenu
          text="Select heuristic"
          serviceHook={postGraphHeuristics}
        />
      </div>
    </div>
  );
};

export default HomePage;

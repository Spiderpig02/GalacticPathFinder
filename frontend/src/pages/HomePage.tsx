import { signal } from "@preact/signals-react";
import MapGrid from "../components/mapGrid/MapGrid";
import MapSizeSlider from "../components/mapSizeSlider/MapSizeSlider";
import { getGraphTraversalMethods } from "../services/getGraphTraversalMethods";
import { postGraphHeuristics } from "../services/postGraphHeuristicMethods";
import { selectedAlgorithm } from "../components/algorithmsMenu/AlgorithmsMenu";
import { useEffect, useState } from "react";
import MapHandler from "../components/filehandler/MapFileHandler";
import AlgorithmsMenu from "../components/algorithmsMenu/AlgorithmsMenu";
import HeuristicsMenu from "../components/heuristicsMenu/HeuristicsMenu";
import { Colors } from "../../colors";

export const sliderSignal = signal<number>(50);
// export const algorithms = signal<string>("");
// export const heuristics = signal<string>("");

const HomePage = () => {
  const backgroundColor = Colors.SS_NAVY_BLUE as string;

  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [heuristics, setHeuristics] = useState<string[]>([]);

  useEffect(() => {
    getGraphTraversalMethods()
      .then((res) => setAlgorithms(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Selected algorithm: ", selectedAlgorithm.value);
    if (selectedAlgorithm.value === "") return;
    console.log("Kommer hit");
    postGraphHeuristics(selectedAlgorithm.value)
      .then((res) => setHeuristics(res))
      .catch((err) => console.log(err));
  }, [selectedAlgorithm.value]);

  // console.log("Selected algorithm: ", selectedAlgorithm.value);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ height: "fit-content" }}>
        <MapGrid />
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
        <AlgorithmsMenu content={algorithms} />
        <HeuristicsMenu content={heuristics ? heuristics : []} />
        <div style={{ height: "1.25rem", width: "250px" }}>
          <MapSizeSlider />
        </div>
        <MapHandler />
      </div>
    </div>
  );
};

export default HomePage;

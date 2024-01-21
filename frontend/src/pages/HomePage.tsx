import { signal } from "@preact/signals-react";
import MapGrid from "../components/mapGrid/MapGrid";
import MapSizeSlider from "../components/MapSizeSlider";
import { getGraphTraversalMethods } from "../services/getGraphTraversalMethods";
import { postGraphHeuristics } from "../services/postGraphHeuristicMethods";
import { selectedAlgorithm } from "../components/algorithmsMenu/AlgorithmsMenu";
import { useEffect, useState } from "react";
import MapHandler from "../components/filehandler/MapHandler";
import AlgorithmsMenu from "../components/algorithmsMenu/AlgorithmsMenu";
import HeuristicsMenu from "../components/heuristicsMenu/HeuristicsMenu";

export const sliderSignal = signal<number>(50);
// export const algorithms = signal<string>("");
// export const heuristics = signal<string>("");

const HomePage = () => {
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [heuristics, setHeuristics] = useState<string[]>([]);
  console.log("Algorithms = ", algorithms);
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
        <AlgorithmsMenu content={algorithms} />
        <HeuristicsMenu content={heuristics ? heuristics : []} />
      </div>
      <MapHandler />
    </div>
  );
};

export default HomePage;

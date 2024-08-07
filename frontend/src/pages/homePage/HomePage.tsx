import { signal } from "@preact/signals-react";
import MapGrid from "../../components/mapGrid/MapGrid";
import MapSizeSlider from "../../components/mapSizeSlider/MapSizeSlider";
import { getGraphTraversalMethods } from "../../services/getGraphTraversalMethods";
import { postGraphHeuristics } from "../../services/postGraphHeuristicMethods";
import { selectedAlgorithm } from "../../components/algorithmsMenu/AlgorithmsMenu";
import { useEffect, useState } from "react";
import MapHandler from "../../components/mapFileHandler/MapFileHandler";
import AlgorithmsMenu from "../../components/algorithmsMenu/AlgorithmsMenu";
import HeuristicsMenu from "../../components/heuristicsMenu/HeuristicsMenu";
import TextFieldAndButton from "../../components/textFieldAndButton/TextFieldAndButton";
import StartAndEndPointsButton from "../../components/startAndEndPointsButton/StartAndEndPointsButton";
import "./HomePage.css";
import DefaultButton from "../../components/defaultButton/DefaultButton";

export const sliderSignal = signal<number>(50);
// export const algorithms = signal<string>("");
// export const heuristics = signal<string>("");

const HomePage = () => {
  //TODO: Make a global colors.css-file and import this in the CSS instead
  // const backgroundColor = Colors.SS_NAVY_BLUE as string;

  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [heuristics, setHeuristics] = useState<string[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  useEffect(() => {
    getGraphTraversalMethods()
      .then((res) => setAlgorithms(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Selected algorithm: ", selectedAlgorithm.value);
    if (selectedAlgorithm.value === "") return;
    postGraphHeuristics(selectedAlgorithm.value)
      .then((res) => setHeuristics(res))
      .catch((err) => console.log(err));
  }, [selectedAlgorithm.value]);

  const handleGenerateObstacles = () => {
    console.log("Generated obstacles");
  };

  const handleGenerateMaze = () => {
    console.log("Generated maze");
  };

  // console.log("Selected algorithm: ", selectedAlgorithm.value);
  return (
    <div className="outer-container-homepage">
      <div className="grid-container-homepage">
        <MapGrid />
      </div>
      <div className="side-menu-homepage">
        <div className="algorithms-and-heuristics-container">
          <AlgorithmsMenu content={algorithms} />
          <HeuristicsMenu content={heuristics ? heuristics : []} />
        </div>
        <MapHandler />
        <div className="map-size-slider-container-homepage">
          <MapSizeSlider />
        </div>
        <div className="generate-obstacles-buttons-container">
          <DefaultButton
            text={"Generate obstacles"}
            onClick={handleGenerateObstacles}
          />
          <DefaultButton text={"Generate maze"} onClick={handleGenerateMaze} />
        </div>
        {/* <button>START</button> */}
        <div className="text-fields-container-homepage">
          <TextFieldAndButton text={"Place obstacles"} />
          <TextFieldAndButton text={"Select animation sped"} />
        </div>
        <StartAndEndPointsButton />
      </div>
    </div>
  );
};

export default HomePage;

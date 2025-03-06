import { signal, useSignalEffect } from "@preact/signals-react";
import MapGrid from "../../components/mapGrid/MapGrid";
import MapSizeSlider from "../../components/mapSizeSlider/MapSizeSlider";
import { getGraphTraversalMethods } from "../../services/getGraphTraversalMethods";
import { postGraphHeuristics } from "../../services/postGraphHeuristicMethods";
import { useEffect, useState } from "react";
import MapHandler from "../../components/mapFileHandler/MapFileHandler";
import HeuristicsMenu from "../../components/heuristicsMenu/HeuristicsMenu";
import TextAndSelect from "../../components/textAndSelect/TextAndSelect";
import StartAndEndPointsButton from "../../components/startAndEndPointsButton/StartAndEndPointsButton";
import "./HomePage.css";
import StartButton from "../../components/startButton/StartButton";
import AlgorithmStepSlider from "../../components/algorithmStepSlider/AlgorithmStepSlider";
import GenerateObstacleButtons from "../../components/generateObstacleButtons/GenerateObstacleButtons";
import AlgorithmsMenu from "../../components/algorithmsMenu/AlgorithmsMenu";
import AnimationSpeedSlider from "../../components/animationStepSlider/AnimationSpeedSlider";
import ClearGridButton from "../../components/clearGridButton/ClearGridButton";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

// SIGNALS =================================================================================

export const mapSizeSliderSignal = signal<number>(50);
export const animationSpeed = signal<number>(1);
// export const algorithmStepSliderSignal = signal<number>(0);
export const selectedAlgorithm = signal<string>("");
export const selectedHeuristic = signal<string>("");

export const algorithmStepSliderSignal = signal({
  currentValue: 0,
  min: 0,
  max: 0,
});

export const showToastSignal = signal<boolean>(false);
export const errorMessageSignal = signal<string>("");

// SIGNALS =================================================================================

const HomePage = () => {
  //TODO: Make a global colors.css-file and import this in the CSS instead

  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const [heuristics, setHeuristics] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize(); // Check initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getGraphTraversalMethods()
      .then((res) => setAlgorithms(res || []))
      .catch((err) => console.log(err));
  }, []);

  useSignalEffect(() => {
    console.log("Selected algorithm: ", selectedAlgorithm.value);
    if (selectedAlgorithm.value === "") return;
    postGraphHeuristics(selectedAlgorithm.value)
      .then((res) => setHeuristics(res || []))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    if (showToastSignal.value) {
      document.body.classList.add("no-scroll");
      const timer = setTimeout(() => {
        showToastSignal.value = false;
        document.body.classList.remove("no-scroll");
      }, 3000);
      return () => {
        clearTimeout(timer);
        document.body.classList.remove("no-scroll");
      };
    }
  }, [showToastSignal.value]);

  useEffect(() => {
    if (errorMessageSignal.value) {
      document.body.classList.add("no-scroll");
      const timer = setTimeout(() => {
        errorMessageSignal.value = "";
        document.body.classList.remove("no-scroll");
      }, 3000);
      return () => {
        clearTimeout(timer);
        document.body.classList.remove("no-scroll");
      };
    }
  }, [errorMessageSignal.value]);

  if (isMobile) {
    return (
      <div className="mobile-message">
        Mobile platforms are not yet supported. We are working on this and will
        release it as soon as possible.
      </div>
    );
  }

  return (
    <div className="outer-container-homepage">
      <div className="grid-container-homepage">
        <MapGrid />
        <AlgorithmStepSlider />
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
        <GenerateObstacleButtons />
        <div className="text-fields-container-homepage">
          <TextAndSelect
            title={"Place obstacles with weight"}
            text={"Choose weight"}
            content={["-1", "0", "1", "2", "3", "4", "5"]}
          />
          <AnimationSpeedSlider />
        </div>
        <StartAndEndPointsButton />
        <div className="start-and-clear-buttons-container-homepage">
          <StartButton />
          <ClearGridButton />
        </div>
      </div>

      {showToastSignal.value && (
        <div className="toast-container-homepage">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>No path was found</AlertTitle>
            <AlertDescription>
              Make sure that there is a possible path from the start node to the
              end node.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {errorMessageSignal.value && (
        <div className="toast-container-homepage">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{errorMessageSignal.value}</AlertTitle>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default HomePage;

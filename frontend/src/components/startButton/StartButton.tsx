import React from "react";
import "./StartButton.css";
import { PostTraversalProps, PostTraversalResponse, Node } from "../../types";
import { postTraversal } from "../../services/postTraversal";
import { endPoint, startPoint, tiles } from "../mapGrid/MapGrid";
import { selectedAlgorithm, selectedHeuristic } from "../../pages/homePage/HomePage";

const StartButton: React.FC = () => {
  const handleTraverse = () => {
    console.log("Traversing the grid");

    const postTraversalProps: PostTraversalProps = {
      algorithm: selectedAlgorithm.value,
      heuristic: selectedHeuristic.value,
      startPoint: startPoint.value,
      endPoint: endPoint.value,
      map: tiles.value,
    };

    console.log(postTraversalProps);
    postTraversal(postTraversalProps)
    .then((res: PostTraversalResponse | null) => {
      if (res) {
        console.log("Response from postTraversal: ", res);
        placePath(res.path);
      }
    })
    .catch(
      (err) => console.log(err));
  };

  const placePath = (path: Node[]) => {
    // TODO: Implement this function
    console.log("Placing path: ", path);
  }
  return (
    <div className="start-button-container">
      <button className="start-button" onClick={handleTraverse}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="play-icon"
        >
          <circle cx="32" cy="32" r="31" stroke="black" strokeWidth="1.5" />
          <path d="M26 20L46 32L26 44V20Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default StartButton;

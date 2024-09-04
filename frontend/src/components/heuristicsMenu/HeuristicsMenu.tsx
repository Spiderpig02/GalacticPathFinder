import React, { useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import "./HeuristicsMenu.css";
import { selectedHeuristic } from "../../pages/homePage/HomePage";

interface DropDownMenuProps {
  content?: string[];
}

const HeuristicsMenu: React.FC<DropDownMenuProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-wrapper">
      <button className="select-menu" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-wrapper">
          {selectedHeuristic.value
            ? selectedHeuristic.value
            : "Choose heuristic"}
        </div>
        <ArrowUpIcon
          className={`vuesax-linear-arrow ${isOpen ? "rotated" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu-sorting">
          {content?.map((item) => (
            <button
              className="dropdown-item-sorting"
              key={item}
              onClick={() => {
                selectedHeuristic.value = item;
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
          {!content?.length && (
            <span>No heuristic available for the selected algorithm</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HeuristicsMenu;

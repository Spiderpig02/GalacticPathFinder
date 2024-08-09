import React, { useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import "./HeuristicsMenu.css";

interface DropDownMenuProps {
  content?: string[];
}

const HeuristicsMenu: React.FC<DropDownMenuProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="dropdown-wrapper">
      <button className="select-menu" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-wrapper">
          {selected ? selected : "Choose heuristic"}
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
                setSelected(item);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeuristicsMenu;

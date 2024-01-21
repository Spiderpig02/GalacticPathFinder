import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import { Colors } from "../../../colors";
import "./AlgorithmsMenu.css";
import { effect, signal } from "@preact/signals-react";

interface DropDownMenuProps {
  content?: string[];
}

export const selectedAlgorithm = signal<string>("");

const AlgorithmsMenu: React.FC<DropDownMenuProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  console.log(content);

  const backgroundColor = Colors.SS_BLUE_GROTTO;

  return (
    <div className="dropdown-wrapper">
      <button
        className="button"
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-wrapper">
          {selected ? selected : "Select algorithm"}
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
                selectedAlgorithm.value = item;
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

export default AlgorithmsMenu;

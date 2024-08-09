import React, { useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import "./AlgorithmsMenu.css";
import { signal } from "@preact/signals-react";

interface DropDownMenuProps {
  content?: string[];
}

export const selectedAlgorithm = signal<string>("");

const AlgorithmsMenu: React.FC<DropDownMenuProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  console.log(content);

  return (
    <div className="dropdown-wrapper">
      <button className="select-menu" onClick={() => setIsOpen(!isOpen)}>
        <div className="text-wrapper">
          {selected ? selected : "Choose algorithm"}
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

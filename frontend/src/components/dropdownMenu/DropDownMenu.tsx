import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";
import { Colors } from "../../../colors";
import "./DropDownMenu.css";
import { effect, signal } from "@preact/signals-react";

interface DropDownMenuProps {
  text: string;
  serviceHook: () => Promise<string[] | null>;
}

export const selectedAlgorithm = signal<string>("");

const DropDownMenu: React.FC<DropDownMenuProps> = ({ text, serviceHook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    serviceHook()
      .then((res) => setContent(res))
      .catch((err) => console.log(err));
  }, []);

  // effect(() => {
  //   selectedAlgorithm.value = selected;
  // });

  console.log(content);

  const backgroundColor = Colors.SS_BLUE_GROTTO;

  return (
    <div className="dropdown-wrapper">
      <button
        className="button"
        style={{ backgroundColor: backgroundColor }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-wrapper">{selected ? selected : text}</div>
        <ArrowUpIcon
          className={`vuesax-linear-arrow ${isOpen ? "rotated" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu-sorting">
          {content.map((item) => (
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

export default DropDownMenu;

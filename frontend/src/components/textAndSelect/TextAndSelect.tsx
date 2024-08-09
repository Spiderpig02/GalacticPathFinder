import "./TextAndSelect.css";
import SmallButton from "../../smallButton/SmallButton";
import { useState } from "react";
import { ArrowUpIcon } from "../../assets/icons/ArrowUpIcon";

interface TextAndSelectProps {
  title: string;
  text: string;
  content?: string[];
}

const TextAndSelect = ({ title, text, content }: TextAndSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <div className="text-field-group-outer-container">
      <div className="text-field-group-title-container">
        <p className="text-and-select-title">{title}</p>
      </div>
      <div className="text-field-and-setbutton-container">
        <div className="dropdown-wrapper">
          <button className="select-menu" onClick={() => setIsOpen(!isOpen)}>
            <div className="text-wrapper">{selected ? selected : text}</div>
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
                    //TODO: Set value of signal here
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextAndSelect;

import { useState } from "react";
import "./TextFieldAndButton.css";
import { PopupTip } from "@fremtind/jkl-tooltip-react";
// Importer stilark via JavaScript med CSS-loader.
import "@fremtind/jkl-tooltip/tooltip.min.css";

// Du må også importere stilarket til ikonene for å vise komponenten riktig:
import "@fremtind/jkl-icons/icons.min.css";
import SmallButton from "../../smallButton/SmallButton";

interface TextFieldAndButtonProps {
  text: string;
}

const TextFieldAndButton = ({ text }: TextFieldAndButtonProps) => {
  return (
    <div className="text-field-group-outer-container">
      <div className="text-field-group-title-container">
        <p className="text-field-group-title">{text}</p>
      </div>
      <div className="text-field-and-setbutton-container">
        <input type="text" className="text-field" />
        <SmallButton text="Set" onClick={() => {}} />
      </div>
    </div>
  );
};

export default TextFieldAndButton;

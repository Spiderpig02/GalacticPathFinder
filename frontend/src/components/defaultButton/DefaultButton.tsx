import React from "react";
import "./DefaultButton.css";

interface DefaultButtonProps {
  onClick: () => void;
  text: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  text,
  onClick,
}: DefaultButtonProps) => {
  return (
    <div className="default-button-container" onClick={onClick}>
      {text}
    </div>
  );
};

export default DefaultButton;

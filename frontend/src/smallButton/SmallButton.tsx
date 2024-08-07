import React from "react";
import "./SmallButton.css";

interface SmallButtonProps {
  onClick: () => void;
  text: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  text,
  onClick,
}: SmallButtonProps) => {
  return (
    <div className="small-button-container" onClick={onClick}>
      {text}
    </div>
  );
};

export default SmallButton;

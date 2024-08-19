import React from "react";
import "./DefaultButton.css";

interface DefaultButtonProps {
  onClick: () => void;
  text: string;
  overrideStyle?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  text,
  onClick,
  overrideStyle,
}: DefaultButtonProps) => {
  return (
    <div
      className={overrideStyle ? overrideStyle : `default-button-container`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default DefaultButton;

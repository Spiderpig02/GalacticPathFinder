import { useState } from "react";
import InfoIcon from "../assets/icons/InfoIcon.svg";

interface TextFieldAndButtonProps {
  fieldName?: string;
  infoText?: string;
  placeholder?: string;
  buttonText?: string;
  onClick?: () => void;
  value: string;
  setValue: (value: string) => void;
}

const TextFieldAndButton = ({
  fieldName,
  infoText,
  placeholder,
  buttonText,
  onClick,
  value,
  setValue,
}: TextFieldAndButtonProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onClick) {
      onClick();
    }
  };
  return (
    <div className="relative">
      <div className="flex flex-row align-middle gap-4">
        <p className="PlaceObstacles w-48 h-7 text-t-white text-2xl font-normal font-['Actor']">
          {fieldName}
        </p>
        <div
          className="relative"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <img src={InfoIcon} alt="info" />
          {showInfo && (
            <div className="absolute left-6 top-0 bg-white p-2 rounded-md shadow">
              {infoText}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row align-middle gap-4">
        <input
          className="bg-t-white w-full tablet:h-[50px] h-[30px] outline-none border-none border-transparent rounded-md px-4"
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button
          className="bg-ss-blue-grotto w-full tablet:h-[50px] h-[30px] outline-none border-none border-transparent rounded-md text-t-white font-semibold"
          value={buttonText}
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TextFieldAndButton;

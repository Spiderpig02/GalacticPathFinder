import SmallButton from "../smallButton/SmallButton";
import "./TextFieldAndButton.css";

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

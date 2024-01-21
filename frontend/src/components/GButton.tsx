interface GButtonProps {
  onClick: () => void;
  text: string;
}

const GButton = ({ text, onClick }: GButtonProps) => {
  return (
    <div
      className="flex bg-ss-blue-grotto w-[270px] h-[54px] rounded-3xl text-black border border-black justify-center items-center gap-2 text-xl cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default GButton;

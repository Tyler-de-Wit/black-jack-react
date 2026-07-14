import chip5 from "../assets/chips/chip-5.svg";
import chip10 from "../assets/chips/chip-10.svg";
import chip25 from "../assets/chips/chip-25.svg";
import chip50 from "../assets/chips/chip-50.svg";
import chip100 from "../assets/chips/chip-100.svg";

type ChipProps = {
  // The value of the chip
  value: number;
  // Function to update the current bet state
  onChipClick: (newBet: number) => void;
};

const chipSvgs: Record<string, string> = {
  5: chip5,
  10: chip10,
  25: chip25,
  50: chip50,
  100: chip100,
};

function Chip({ value, onChipClick }: ChipProps) {
  const svgSource = chipSvgs[value];

  return (
    <button
      className="chip"
      onClick={() => {
        onChipClick(value);
      }}
    >
      <img src={svgSource} width={80} height={80} alt={`chip ${value}`} />
    </button>
  );
}

export default Chip;

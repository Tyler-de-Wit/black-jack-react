type ChipProps = {
  value: number;
  onChipClick: (newBet: number) => void;
};

function Chip({ value, onChipClick }: ChipProps) {
  return (
    <button
      className="chip"
      onClick={() => {
        onChipClick(value);
      }}
    >
      {value}
    </button>
  );
}

export default Chip;

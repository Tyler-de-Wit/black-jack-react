import Chip from "./Chip";

type BettingAreaProps = {
  // Function to update the current bet state
  handleCurrentBetChange: (newBet: number) => void;
  // Current bet state value
  currentBet: number;
  // Total balance state value
  totalBalance: number;
};

function BettingArea({
  handleCurrentBetChange,
  currentBet,
  totalBalance,
}: BettingAreaProps) {
  // Format totalBalance with commas
  const formattedTotalBalance = new Intl.NumberFormat().format(totalBalance);

  return (
    <div className="betting-area">
      <div>
        <h2>Bets</h2>
        <p>Current Bet: ${totalBalance === 0 ? "0" : currentBet}</p>
        <p>Total Balance: ${formattedTotalBalance}</p>
      </div>
      <div>
        <h2>Chips</h2>
        <Chip
          value={5}
          totalBalance={totalBalance}
          onChipClick={handleCurrentBetChange}
        />
        <Chip
          value={10}
          totalBalance={totalBalance}
          onChipClick={handleCurrentBetChange}
        />
        <Chip
          value={25}
          totalBalance={totalBalance}
          onChipClick={handleCurrentBetChange}
        />
        <Chip
          value={50}
          totalBalance={totalBalance}
          onChipClick={handleCurrentBetChange}
        />
        <Chip
          value={100}
          totalBalance={totalBalance}
          onChipClick={handleCurrentBetChange}
        />
      </div>
    </div>
  );
}

export default BettingArea;

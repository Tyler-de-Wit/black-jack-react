type PlayingCardProps = {
  // Value of the card: 3, Ace, King etc.
  value: string;
  // Suit the card belongs to: hearts, diamonds, clubs, spades.
  suit: string;
};

function PlayingCard({ value, suit }: PlayingCardProps) {
  return (
    <div className="playing-card">
      <p>
        {value} of {suit}
      </p>
    </div>
  );
}

export default PlayingCard;

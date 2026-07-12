import "./App.css";
import { useState } from "react";
import shuffleDeck from "./lib/shuffleDeck";
import calculateHandValue from "./lib/calculateHandValue";
import PlayingCard from "./components/PlayingCard";
import deckOfCards from "./data/deckOfCards";

type Card = {
  id: number;
  value: string;
  suit: string;
};

type GameState = {
  playersHand: Card[];
  dealersHand: Card[];
  deck: Card[];
  playersTurn: boolean;
};

function App() {
  const [game, setGame] = useState<GameState>({
    playersHand: [],
    dealersHand: [],
    deck: [],
    playersTurn: true,
  });

  // Start a new game
  const startGame = () => {
    const deck = shuffleDeck(deckOfCards);

    // Draw player and dealer's starting cards
    const playersHand = [deck[0], deck[2]];
    const dealersHand = [deck[1], deck[3]];

    // Update state
    setGame({
      playersHand,
      dealersHand,
      deck: deck.slice(4),
      playersTurn: true,
    });
  };

  // Draw a new card for the player
  const handleHit = () => {
    // Get deck and draw card for player
    const deck = [...game.deck];
    const card = deck.shift();

    // Check if deck is empty
    if (!card) return;

    // Add card to players hand and calculate it's new value
    const playersHand = [...game.playersHand, card];
    const value = calculateHandValue(playersHand);

    // Finish players turn if their hand is over 21
    const playersTurn = value < 21;

    // Update state
    setGame({
      ...game,
      playersHand,
      deck,
      playersTurn,
    });

    // Check for player Blackjack or Bust
    if (value === 21) {
      console.log("Blackjack");
    } else if (value > 21) {
      console.log("Bust");
    }
  };

  // End player's turn and draw dealer's cards
  const handleStand = () => {
    // Get deck and dealer's hand
    const deck = [...game.deck];
    const dealersHand = [...game.dealersHand];

    // Draw cards for the dealer while their hand is less than 17
    while (calculateHandValue(dealersHand) < 17) {
      const card = deck.shift();

      if (!card) break;

      dealersHand.push(card);
    }

    // Check for a dealer Bust
    const dealerValue = calculateHandValue(dealersHand);
    if (dealerValue > 21) {
      console.log("Dealer Bust");
    }

    // Update state
    setGame({
      ...game,
      dealersHand,
      deck,
      playersTurn: false,
    });
  };

  console.log(`Dealer: ${calculateHandValue(game.dealersHand)}`);
  console.log(`Player: ${calculateHandValue(game.playersHand)}`);

  return (
    <>
      <div>
        <h2>Dealers Hand</h2>
        {game.dealersHand.map((card) => (
          <PlayingCard value={card.value} suit={card.suit} key={card.id} />
        ))}
      </div>
      <div>
        <h2>Players Hand</h2>
        {game.playersHand.map((card) => (
          <PlayingCard value={card.value} suit={card.suit} key={card.id} />
        ))}
      </div>
      <button onClick={startGame}>New Game</button>
      <button onClick={handleHit} disabled={!game.playersTurn}>
        Hit
      </button>
      <button onClick={handleStand} disabled={!game.playersTurn}>
        Stand
      </button>
      <p>Dealer stands on all 17's</p>
    </>
  );
}

export default App;

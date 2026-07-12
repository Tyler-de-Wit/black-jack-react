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

function App() {
  const [playersHand, setPlayersHand] = useState<Card[]>([]);
  const [dealersHand, setDealersHand] = useState<Card[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Card[]>([]);
  const [playersTurn, setPlayersTurn] = useState(true);

  // Initialise a new game using a local fresh deck
  const startGame = () => {
    setPlayersTurn(true);

    // Shuffle deck
    const localDeck = shuffleDeck(deckOfCards);

    // Deal starting cards
    const pHand = [localDeck[0], localDeck[2]];
    const dHand = [localDeck[1], localDeck[3]];

    // Remove dealt cards from local deck
    const remainingDeck = localDeck.slice(4);

    // Update state with local values
    setPlayersHand(pHand);
    setDealersHand(dHand);
    setCurrentDeck(remainingDeck);
  };

  // Give the player another card
  const handleHit = () => {
    // Get deck and draw a card
    const deck = [...currentDeck];
    const card = deck.shift()!;

    // Get players hand and calculate its value
    const hand = [...playersHand, card];
    const value = calculateHandValue(hand);

    // Update state with player's hand and deck
    setPlayersHand(hand);
    setCurrentDeck(deck);

    // Check for player Blackjack or Bust
    if (value >= 21) {
      setPlayersTurn(false);

      if (value === 21) {
        console.log("Blackjack");
      } else {
        console.log("Bust");
      }
    }
  };

  // Finish the players turn and deal cards to the dealer
  const handleStand = () => {
    setPlayersTurn(false);

    // Get deck and dealers current hand
    let deck = [...currentDeck];
    let dealerHand = [...dealersHand];

    // Draw cards for the dealer while their total is less than 17
    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(deck.shift()!);
    }

    // Update state with dealer's hand and deck
    setDealersHand(dealerHand);
    setCurrentDeck(deck);

    // Check for dealer Bust
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue > 21) {
      console.log("Dealer Bust");
    }
  };

  console.log(`Dealers Hand: ${calculateHandValue(dealersHand)}`);
  console.log(`Players Hand ${calculateHandValue(playersHand)}`);

  return (
    <>
      <div>
        <h2>Dealers Hand</h2>
        {dealersHand.map((card) => (
          <PlayingCard value={card.value} suit={card.suit} key={card.id} />
        ))}
      </div>
      <div>
        <h2>Players Hand</h2>
        {playersHand.map((card) => (
          <PlayingCard value={card.value} suit={card.suit} key={card.id} />
        ))}
      </div>
      <button onClick={startGame}>New Game</button>
      <button onClick={handleHit} disabled={!playersTurn}>
        Hit
      </button>
      <button onClick={handleStand} disabled={!playersTurn}>
        Stand
      </button>
      <p>Dealer stands on all 17's</p>
    </>
  );
}

export default App;

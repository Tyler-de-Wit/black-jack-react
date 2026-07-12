import "./App.css";
import { useState } from "react";
import shuffleDeck from "./lib/shuffleDeck";
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

  // Initialise a new game using a local fresh deck
  const startGame = () => {
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

  // Add a card to the player or dealers hand from the current deck
  const addCardToHand = (
    setHand: React.Dispatch<React.SetStateAction<Card[]>>,
  ) => {
    if (currentDeck.length === 0) return;

    // Draw card from top of deck
    const drawnCard = currentDeck[0];

    // Update currentDeck and hand state from the drawn card
    setCurrentDeck((prevDeck) => prevDeck.slice(1));
    setHand((prevHand) => [...prevHand, drawnCard]);
  };

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
    </>
  );
}

export default App;

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
  resultMessage: string;
};

function App() {
  const [game, setGame] = useState<GameState>({
    playersHand: [],
    dealersHand: [],
    deck: [],
    playersTurn: true,
    resultMessage: "",
  });

  // Start a new game
  const startGame = () => {
    const deck = shuffleDeck(deckOfCards);
    let playersTurn = true;
    let resultMessage = "";

    // Draw player and dealer's starting cards
    const playersHand = [deck[0], deck[2]];
    const dealersHand = [deck[1], deck[3]];

    // Check for player Blackjack
    if (calculateHandValue(playersHand) === 21) {
      playersTurn = false;
      resultMessage = "Blackjack, You Win!";
    }

    // Check for dealer Blackjack
    if (calculateHandValue(dealersHand) === 21) {
      playersTurn = false;
      resultMessage = "Dealer Blackjack, You Loose";
    }

    // Update state
    setGame({
      playersHand,
      dealersHand,
      deck: deck.slice(4),
      playersTurn: playersTurn,
      resultMessage: resultMessage,
    });
  };

  // Draw a new card for the player
  const handleHit = () => {
    let resultMessage = "";

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

    // Check for player Blackjack or Bust
    if (value === 21) {
      resultMessage = "Blackjack, You Win!";
    } else if (value > 21) {
      resultMessage = "Bust, You Loose";
    }

    // Update state
    setGame({
      ...game,
      playersHand,
      deck,
      playersTurn,
      resultMessage,
    });
  };

  // End player's turn and draw dealer's cards
  const handleStand = () => {
    let resultMessage = "";

    // Get deck, dealer and player's hand
    const deck = [...game.deck];
    const dealersHand = [...game.dealersHand];
    const playersHand = [...game.playersHand];

    // Draw cards for the dealer while their hand is less than 17
    while (calculateHandValue(dealersHand) < 17) {
      const card = deck.shift();

      if (!card) break;

      dealersHand.push(card);
    }

    // Check for a dealer Bust
    const dealerValue = calculateHandValue(dealersHand);
    const playerValue = calculateHandValue(playersHand);
    if (dealerValue > 21) {
      resultMessage = "Dealer Bust, You Win!";
    } else if (dealerValue === 21) {
      resultMessage = "Dealer Blackjack, You Loose";
    } else if (dealerValue > playerValue) {
      resultMessage = "Dealer Higher Total, You Loose";
    } else if (playerValue > dealerValue) {
      resultMessage = "Player Higher Total, You Win!";
    } else if (playerValue === dealerValue) {
      resultMessage = "Push, Player And Dealer Are Tied";
    }

    // Update state
    setGame({
      ...game,
      dealersHand,
      deck,
      playersTurn: false,
      resultMessage,
    });
  };

  return (
    <main>
      <section className="card-hands">
        <div className="dealers-hand">
          <h2>Dealer {calculateHandValue(game.dealersHand)}</h2>
          {game.dealersHand.map((card) => (
            <PlayingCard value={card.value} suit={card.suit} key={card.id} />
          ))}
        </div>
        <div className="players-hand">
          <h2>Player {calculateHandValue(game.playersHand)}</h2>
          {game.playersHand.map((card) => (
            <PlayingCard value={card.value} suit={card.suit} key={card.id} />
          ))}
        </div>
      </section>
      <div className="game-buttons">
        <button onClick={handleHit} disabled={!game.playersTurn}>
          Hit
        </button>
        <button onClick={handleStand} disabled={!game.playersTurn}>
          Stand
        </button>
        <br />
        <button onClick={startGame}>New Game</button>
        <p>{game.resultMessage}</p>
      </div>
      <p>Dealer stands on all 17's</p>
    </main>
  );
}

export default App;

import "./App.css";
import { useState } from "react";
import shuffleDeck from "./lib/shuffleDeck";
import calculateHandValue from "./lib/calculateHandValue";
import PlayingCard from "./components/PlayingCard";
import Button from "./components/Button";
import GameStatistics from "./components/GameStatistics";
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

type GameStatisticsState = {
  gamesPlayed: number;
  dealerWins: number;
  playerWins: number;
};

function App() {
  const [game, setGame] = useState<GameState>({
    playersHand: [],
    dealersHand: [],
    deck: [],
    playersTurn: true,
    resultMessage: "",
  });
  const [gameStatistics, setGameStatistics] = useState<GameStatisticsState>({
    gamesPlayed: 0,
    dealerWins: 0,
    playerWins: 0,
  });

  // Start a new game
  const startGame = () => {
    const deck = shuffleDeck(deckOfCards);
    let playersTurn = true;
    let resultMessage = "";

    // Draw player and dealer's starting cards
    const playersHand = [deck[0], deck[2]];
    const dealersHand = [deck[1], deck[3]];

    if (
      calculateHandValue(playersHand) === 21 &&
      calculateHandValue(dealersHand) === 21
    ) {
      playersTurn = false;
      resultMessage = "Push, Both Have Blackjack";

      finishGame("push");
    }

    // Check for player Blackjack
    else if (calculateHandValue(playersHand) === 21) {
      playersTurn = false;
      resultMessage = "Blackjack, You Win!";

      finishGame("player");
    }

    // Check for dealer Blackjack
    else if (calculateHandValue(dealersHand) === 21) {
      playersTurn = false;
      resultMessage = "Dealer Blackjack, You Lose";

      finishGame("dealer");
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
      finishGame("player");
    } else if (value > 21) {
      resultMessage = "Bust, You Lose";
      finishGame("dealer");
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
      finishGame("player");
    } else if (dealerValue === 21) {
      resultMessage = "Dealer Blackjack, You Lose";
      finishGame("dealer");
    } else if (dealerValue > playerValue) {
      resultMessage = "Dealer Higher Total, You Lose";
      finishGame("dealer");
    } else if (playerValue > dealerValue) {
      resultMessage = "Player Higher Total, You Win!";
      finishGame("player");
    } else if (playerValue === dealerValue) {
      resultMessage = "Push, Player And Dealer Are Tied";
      finishGame("push");
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

  // Update game statistics when game finishes
  const finishGame = (winner: "player" | "dealer" | "push") => {
    setGameStatistics((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      playerWins: prev.playerWins + (winner === "player" ? 1 : 0),
      dealerWins: prev.dealerWins + (winner === "dealer" ? 1 : 0),
    }));
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
        <Button
          onClick={handleHit}
          disabled={!game.playersTurn}
          message="Hit"
        />
        <Button
          onClick={handleStand}
          disabled={!game.playersTurn}
          message="Stand"
        />
        <br />
        <Button onClick={startGame} message="New Game" />
        <p>{game.resultMessage}</p>
      </div>
      <GameStatistics
        gamesPlayed={gameStatistics.gamesPlayed}
        dealerWins={gameStatistics.dealerWins}
        playerWins={gameStatistics.playerWins}
      />
      <p>Dealer stands on all 17's</p>
    </main>
  );
}

export default App;

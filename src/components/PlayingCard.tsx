import clubs2 from "../assets/playing-cards/2-clubs.svg";
import diamonds2 from "../assets/playing-cards/2-diamonds.svg";
import hearts2 from "../assets/playing-cards/2-hearts.svg";
import spades2 from "../assets/playing-cards/2-spades.svg";

import clubs3 from "../assets/playing-cards/3-clubs.svg";
import diamonds3 from "../assets/playing-cards/3-diamonds.svg";
import hearts3 from "../assets/playing-cards/3-hearts.svg";
import spades3 from "../assets/playing-cards/3-spades.svg";

import clubs4 from "../assets/playing-cards/4-clubs.svg";
import diamonds4 from "../assets/playing-cards/4-diamonds.svg";
import hearts4 from "../assets/playing-cards/4-hearts.svg";
import spades4 from "../assets/playing-cards/4-spades.svg";

import clubs5 from "../assets/playing-cards/5-clubs.svg";
import diamonds5 from "../assets/playing-cards/5-diamonds.svg";
import hearts5 from "../assets/playing-cards/5-hearts.svg";
import spades5 from "../assets/playing-cards/5-spades.svg";

import clubs6 from "../assets/playing-cards/6-clubs.svg";
import diamonds6 from "../assets/playing-cards/6-diamonds.svg";
import hearts6 from "../assets/playing-cards/6-hearts.svg";
import spades6 from "../assets/playing-cards/6-spades.svg";

import clubs7 from "../assets/playing-cards/7-clubs.svg";
import diamonds7 from "../assets/playing-cards/7-diamonds.svg";
import hearts7 from "../assets/playing-cards/7-hearts.svg";
import spades7 from "../assets/playing-cards/7-spades.svg";

import clubs8 from "../assets/playing-cards/8-clubs.svg";
import diamonds8 from "../assets/playing-cards/8-diamonds.svg";
import hearts8 from "../assets/playing-cards/8-hearts.svg";
import spades8 from "../assets/playing-cards/8-spades.svg";

import clubs9 from "../assets/playing-cards/9-clubs.svg";
import diamonds9 from "../assets/playing-cards/9-diamonds.svg";
import hearts9 from "../assets/playing-cards/9-hearts.svg";
import spades9 from "../assets/playing-cards/9-spades.svg";

import clubs10 from "../assets/playing-cards/10-clubs.svg";
import diamonds10 from "../assets/playing-cards/10-diamonds.svg";
import hearts10 from "../assets/playing-cards/10-hearts.svg";
import spades10 from "../assets/playing-cards/10-spades.svg";

import clubsAce from "../assets/playing-cards/ace-clubs.svg";
import diamondsAce from "../assets/playing-cards/ace-diamonds.svg";
import heartsAce from "../assets/playing-cards/ace-hearts.svg";
import spadesAce from "../assets/playing-cards/ace-spades.svg";

import clubsJack from "../assets/playing-cards/jack-clubs.svg";
import diamondsJack from "../assets/playing-cards/jack-diamonds.svg";
import heartsJack from "../assets/playing-cards/jack-hearts.svg";
import spadesJack from "../assets/playing-cards/jack-spades.svg";

import clubsQueen from "../assets/playing-cards/queen-clubs.svg";
import diamondsQueen from "../assets/playing-cards/queen-diamonds.svg";
import heartsQueen from "../assets/playing-cards/queen-hearts.svg";
import spadesQueen from "../assets/playing-cards/queen-spades.svg";

import clubsKing from "../assets/playing-cards/king-clubs.svg";
import diamondsKing from "../assets/playing-cards/king-diamonds.svg";
import heartsKing from "../assets/playing-cards/king-hearts.svg";
import spadesKing from "../assets/playing-cards/king-spades.svg";

import backRed from "../assets/playing-cards/back-red.svg";

const cardSvgs: Record<string, string> = {
  "2-clubs": clubs2,
  "2-diamonds": diamonds2,
  "2-hearts": hearts2,
  "2-spades": spades2,

  "3-clubs": clubs3,
  "3-diamonds": diamonds3,
  "3-hearts": hearts3,
  "3-spades": spades3,

  "4-clubs": clubs4,
  "4-diamonds": diamonds4,
  "4-hearts": hearts4,
  "4-spades": spades4,

  "5-clubs": clubs5,
  "5-diamonds": diamonds5,
  "5-hearts": hearts5,
  "5-spades": spades5,

  "6-clubs": clubs6,
  "6-diamonds": diamonds6,
  "6-hearts": hearts6,
  "6-spades": spades6,

  "7-clubs": clubs7,
  "7-diamonds": diamonds7,
  "7-hearts": hearts7,
  "7-spades": spades7,

  "8-clubs": clubs8,
  "8-diamonds": diamonds8,
  "8-hearts": hearts8,
  "8-spades": spades8,

  "9-clubs": clubs9,
  "9-diamonds": diamonds9,
  "9-hearts": hearts9,
  "9-spades": spades9,

  "10-clubs": clubs10,
  "10-diamonds": diamonds10,
  "10-hearts": hearts10,
  "10-spades": spades10,

  "ace-clubs": clubsAce,
  "ace-diamonds": diamondsAce,
  "ace-hearts": heartsAce,
  "ace-spades": spadesAce,

  "jack-clubs": clubsJack,
  "jack-diamonds": diamondsJack,
  "jack-hearts": heartsJack,
  "jack-spades": spadesJack,

  "queen-clubs": clubsQueen,
  "queen-diamonds": diamondsQueen,
  "queen-hearts": heartsQueen,
  "queen-spades": spadesQueen,

  "king-clubs": clubsKing,
  "king-diamonds": diamondsKing,
  "king-hearts": heartsKing,
  "king-spades": spadesKing,
};

type PlayingCardProps = {
  // Value of the card: 3, Ace, King etc.
  value: string;
  // Suit the card belongs to: hearts, diamonds, clubs, spades.
  suit: string;
  // Individual styling for each card
  className: string;
  // Boolean for whether or not card should be face down
  faceDown: boolean;
};

function PlayingCard({ value, suit, className, faceDown }: PlayingCardProps) {
  let cardId;
  let svgSource;

  // Check for dealers hand to give them a face down card
  if (faceDown) {
    svgSource = backRed;
  } else {
    // Build the id for the card based on the passed in props
    cardId = `${value}-${suit}`.toLowerCase();

    // Lookup the svgSource from the object
    svgSource = cardSvgs[cardId];
  }

  // Handle non existent card
  if (!svgSource) {
    return null;
  }

  return (
    <div className={`playing-card card-${className}`}>
      <img
        src={svgSource}
        width={179}
        height={250}
        alt={`${faceDown ? "Face down card" : `${value} of ${suit}`}`}
      />
    </div>
  );
}

export default PlayingCard;

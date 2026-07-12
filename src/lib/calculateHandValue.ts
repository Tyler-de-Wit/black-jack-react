type Card = {
  id: number;
  value: string;
  suit: string;
};

function calculateHandValue(currentHand: Card[]) {
  let currentHandValue = 0;

  currentHand.forEach((card) => {
    // Set Jack, Queen or King's value to 10
    if (
      card.value === "Jack" ||
      card.value === "Queen" ||
      card.value === "King"
    ) {
      const currentCardsValue = 10;
      currentHandValue += currentCardsValue;
    }
    // Set any numbered card to its number
    else if (card.value !== "Ace") {
      const currentCardsValue = Number(card.value);
      currentHandValue += currentCardsValue;
    }
    // Check if Ace should equal 11 or 1 and set it correspondingly
    else if (card.value === "Ace") {
      if (currentHandValue <= 10) {
        const currentCardsValue = 11;
        currentHandValue += currentCardsValue;
      } else {
        const currentCardsValue = 1;
        currentHandValue += currentCardsValue;
      }
    }
  });

  return currentHandValue;
}

export default calculateHandValue;

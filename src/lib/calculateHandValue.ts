type Card = {
  id: number;
  // Value of the card: 3, Ace, King etc.
  value: string;
  // Suit the card belongs to: hearts, diamonds, clubs, spades.
  suit: string;
};

function calculateHandValue(currentHand: Card[]) {
  let rearrangedCurrentHand = [...currentHand];
  let currentHandValue = 0;

  // Function to move ace to end of array as its value needs to be calculated last
  const moveAceToBack = (arr: Card[], fromIndex: number, toIndex: number) => {
    const element = arr[fromIndex];

    // Remove ace from currentHand
    const newArr = arr.toSpliced(fromIndex, 1);

    // Reinsert ace at end of currentHand
    return newArr.toSpliced(toIndex, 0, element);
  };

  // Check for any ace's in currend hand and then move them to the back
  currentHand.forEach((card, index) => {
    if (card.value === "Ace") {
      rearrangedCurrentHand = moveAceToBack(
        rearrangedCurrentHand,
        index,
        rearrangedCurrentHand.length - 1,
      );
    }
  });

  // Loop through each card and determine it's value
  rearrangedCurrentHand.forEach((card) => {
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
    else {
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

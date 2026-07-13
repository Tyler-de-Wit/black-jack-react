type ResultMessageProps = {
  message: string;
};

function ResultMessage({ message }: ResultMessageProps) {
  // Check for player win or loss in message to set background colour
  let resultColour;
  if (message.includes("Lose")) {
    resultColour = "lose";
  } else if (message.includes("Win")) {
    resultColour = "win";
  }

  return (
    <div className={`result-message result-${resultColour}`}>{message}</div>
  );
}

export default ResultMessage;

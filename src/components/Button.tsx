type ButtonProps = {
  // Function to be run when "New Game", "Hit" or "Stand" buttons are pressed
  onClick: () => void;
  // Whether button should be disabled based on players turn
  disabled?: boolean;
  // The text content for the button
  message: string;
};

function Button({ onClick, disabled, message }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {message}
    </button>
  );
}

export default Button;

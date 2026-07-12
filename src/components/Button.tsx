type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
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

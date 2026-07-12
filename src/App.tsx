import "./App.css";
import PlayingCard from "./components/PlayingCard";
import deckOfCards from "./data/deckOfCards";

function App() {
  return (
    <PlayingCard value={deckOfCards[28].value} suit={deckOfCards[28].suit} />
  );
}

export default App;

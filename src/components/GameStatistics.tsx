import calculatePercentage from "../lib/calculatePercentage";

type GameStatisticsProps = {
  // Amount of games played
  gamesPlayed: number;
  // Amount of games in which the dealer won
  dealerWins: number;
  // Amount of games in which the player won
  playerWins: number;
};

function GameStatistics({
  gamesPlayed,
  dealerWins,
  playerWins,
}: GameStatisticsProps) {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Games Played</th>
          <th>Dealer Wins</th>
          <th>Player Wins</th>
          <th className="dealer-win-percentage">Dealer Win Percentage</th>
          <th className="player-win-percentage">Player Win Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gamesPlayed}</td>
          <td>{dealerWins}</td>
          <td>{playerWins}</td>
          <td>{calculatePercentage(dealerWins, gamesPlayed)}%</td>
          <td>{calculatePercentage(playerWins, gamesPlayed)}%</td>
        </tr>
      </tbody>
    </table>
  );
}

export default GameStatistics;

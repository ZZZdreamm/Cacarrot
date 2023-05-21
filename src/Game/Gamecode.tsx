import { useLocation, useNavigate } from "react-router-dom";
import { Game, Player } from "./game.models";
import PlayerContainer from "./PlayerContainer";
import { useState } from "react";

export default function Gamecode() {
  const location = useLocation();
  //@ts-ignore
  const { state } = location;
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>({
    gameTemplate: state.template,
    players: [
      { id: 1, name: "orkllllll", points: 10 },
      { id: 2, name: "orkllllll", points: 0 },
      { id: 3, name: "orkllllll", points: 30 },
      { id: 4, name: "orkllllll", points: 0 },
      { id: 5, name: "orkllllll", points: 10 },
      { id: 6, name: "orkllllll", points: 110 },
      { id: 7, name: "orkllllll", points: 60 },
    ],
    gamecode: state.gamecode,
  });
  function startGame() {
    const gameProps = { gamestate: game};
    navigate("/game-host", {state: gameProps});
  }
  return (
    <div
      className="column-shaped-container"
    >
      <h2>Your game code</h2>
      <span className="column-shaped-container"
      >
        <h2>{state.gamecode}</h2>
        <h3>Number of players in game: {game.players.length}/10</h3>
      </span>
      <div className="player-list">
        {game.players.map((player: Player) => (
          <PlayerContainer key={player.id} player={player} image={""} />
        ))}
      </div>
      <button className="start-game-btn" onClick={startGame}>
        Start game
      </button>
    </div>
  );
}

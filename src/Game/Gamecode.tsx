import { useLocation, useNavigate } from "react-router-dom";
import { Game, Player } from "./game.models";
import PlayerContainer from "./PlayerContainer";
import { useEffect, useState } from "react";
import { getGameData, setDataInDB } from "../FirebaseDatabase/GamesInDB";
import { fetchGame, startGame } from "./FunctionsGame";
import { socket } from "../App";

export default function Gamecode() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>({
    gameTemplate: state.template,
    players: [],
    gamecode: state.gamecode,
    started: "waiting",
    currentQuestion: 0,
    time: state.template.questionTime,
    gamePhase: 1,
    startingTime: 3,
    winners: [],
    hostConnection: true,
    hostId: socket.id,
  });

  const [startDisabled, setStartDisabled] = useState(true);

  useEffect(() => {
    fetchGame(state, setGame);
    getGameData(game!.gamecode, setGame);
    socket.emit("host", { code: game.gamecode, hostId: socket.id });
  }, []);

  useEffect(() => {
    if (game.players.length >= 1) {
      setStartDisabled(false);
    } else {
      setStartDisabled(true);
    }
  }, [game.players]);

  useEffect(() => {
    if (game.started == "started") {
      const gameProps = { gamestate: game };
      navigate(`/game-host/${game.gamecode}`, { state: gameProps });
    }
  }, [game]);

  return (
    <div className="column-shaped-container">
      {game && (
        <>
          <h2>Your game code</h2>
          <span className="column-shaped-container">
            <h2>{state.gamecode}</h2>
            {game.players && (
              <h3>Number of players in game: {game.players.length}/10</h3>
            )}
          </span>
          <div className="player-list">
            {game.players &&
              game.players.length != 0 &&
              game.players.map((player: Player) => (
                <PlayerContainer key={player.id} player={player} image={""} />
              ))}
          </div>
          <button
            disabled={startDisabled}
            className="start-game-btn"
            onClick={startGame}
          >
            Start game
          </button>
        </>
      )}
    </div>
  );
}

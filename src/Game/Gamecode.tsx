import { useLocation, useNavigate } from "react-router-dom";
import { Game, Player } from "./game.models";
import PlayerContainer from "./PlayerContainer";
import { useEffect, useState } from "react";
import {
  createGameInDB,
  getGameData,
  setDataInDB,
} from "../FirebaseDatabase/GamesInDB";
import { gamesRef } from "../FirebaseDatabase/FirebaseConfig";

export default function Gamecode() {
  const location = useLocation();
  //@ts-ignore
  const { state } = location;
  const navigate = useNavigate();

  const [game, setGame] = useState<Game>({
    gameTemplate: state.template,
    players: [],
    gamecode: state.gamecode,
    started: 'waiting',
    currentQuestion:0,
    time:state.template.questionTime,
    gamePhase:1
  });

  const [startDisabled, setStartDisabled] = useState(true);
  function startGame() {
    if (game!.players.length >= 1) {
      setGame({
        ...game!,
        started: 'started',
      });
      setDataInDB(game.gamecode, 'started', 'gameStarted')
    }
  }

  useEffect(() => {
    const fetchGame = async () => {
      const snapshot = await gamesRef.child(state.gamecode).once("value");
      const fetchedData = snapshot.val();

      let transformedData: Game = {
        gameTemplate: state.template,
        players: [],
        gamecode: state.gamecode,
        started: 'waiting',
        currentQuestion: 0,
        time:state.template.questionTime,
        gamePhase:1
      }
      if (fetchedData) {
          const {gameTemplate, gamecode, players, started, currentQuestion, time, gamePhase} = fetchedData
          let myPlayers : any = players ? Object.values(players).map((player:any) => {
            const {id, name, points, lastAnswer, shownComponent} = player??{}
            const newPlayer: Player = {id, name, points, lastAnswer, shownComponent}
            return newPlayer
          }) : []
          transformedData = {gameTemplate, gamecode, players:myPlayers, started, currentQuestion, time, gamePhase}
        setGame(transformedData);
      } else {
        await createGameInDB(transformedData)
      }
    };
    fetchGame()

    getGameData(game!.gamecode, setGame);
  }, []);






  useEffect(() => {
    if (game.players.length >= 1) {
      setStartDisabled(false);
    }
  }, [game.players]);

  useEffect(() => {
    if (game.started == 'started') {
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
            <h3>Number of players in game: {game.players.length}/10</h3>
          </span>
          <div className="player-list">
            {game.players && game.players.length != 0 && game.players.map((player: Player) => (
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

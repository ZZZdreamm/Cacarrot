import { useLocation, useNavigate } from "react-router-dom";
import { Game, Player } from "./game.models";
import PlayerContainer from "./PlayerContainer";
import { useEffect, useState } from "react";
import {
  createGameInDB,
  gamesRef,
  getGameData,
  setGameStarted,
} from "../FirebaseDatabase/FirebaseConfig";

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
    currentQuestion:0
  });
  // const [game, setGame] = useState<Game | null>(null);
  const [startDisabled, setStartDisabled] = useState(true);
  function startGame() {
    if (game!.players.length >= 1) {
      setGame({
        ...game!,
        started: 'started',
      });
      setGameStarted(game.gamecode, 'started')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await gamesRef.child(state.gamecode).once("value");
      const fetchedData = snapshot.val();
      if (fetchedData) {
      console.log('what')

        let transformedData: Game = {
          gameTemplate: state.template,
          players: [],
          gamecode: state.gamecode,
          started: 'waiting',
          currentQuestion: 1
        }

          const {gameTemplate, gamecode, players, started, currentQuestion} = fetchedData
          let myPlayers : any = []
          if(players){
            Object.values(players).forEach((player:any) => {
              const {id, name, points, lastAnswer} = player
              const newPlayer: Player = {id:id, name:name, points:points, lastAnswer:lastAnswer}
              myPlayers.push(newPlayer)
            })
          }
          transformedData = {gameTemplate:gameTemplate, gamecode:gamecode, players:myPlayers, started:started, currentQuestion:currentQuestion}
        setGame(transformedData);
      } else {
        const newData = {
          gameTemplate: state.template,
          players: [],
          gamecode: state.gamecode,
          started: 'waiting',
          currentQuestion:1
        };
        await createGameInDB(newData)
      }
    };
    fetchData()
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

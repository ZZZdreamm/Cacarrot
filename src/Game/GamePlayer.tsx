import { useEffect, useState } from "react";
import {
  getGameData,
  getOnShownComponent,
  getPlayer,
  fetchData,
  setDataInDB,
  getOnWinners,
  fetchPlayerData,
  getOnPlayerPoints,
} from "../FirebaseDatabase/GamesInDB";
import { useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import AnswerPage from "./AnswerPage";
import Winners from "./Winners";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import BetweenQuestions from "./BetweenQuestions";
import PlayerBar from "./Player";
import Waiting from "../Utilities/Waiting";
import { socket } from "../App";
import { pointsForLast } from "./FunctionsGame";

export default function GamePlayer() {
  const location = useLocation();
  const { state } = location;

  const [game, setGame] = useState<Game>(state.game);
  const [shownComponent, setShownComponent] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [player, setPlayer] = useState<Player>();
  const [lastQuestionPoints, setLastQuestionPoints] = useState(0);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [showPage, setShowPage] = useState(false);
  const [reconnectionTime, setReconnectionTime] = useState(() => {
    const storedTime = localStorage.getItem("time");
    if (storedTime && storedTime != "undefined") {
      return parseInt(JSON.parse(storedTime));
    } else {
      return 15;
    }
  });
  const playerName = state.username
    ? state.username
    : localStorage.getItem(`username/${state.playerNumber}`);

  useEffect(() => {
    socket.emit('gamecode', state.game.gamecode)
    getGameData(state.game.gamecode, setGame);
  }, []);

  useEffect(() => {
    if (game.gamecode && playerName) {
      if (!player) {
        getPlayer(game.gamecode, playerName, setPlayer);
      }
      if (player) {
        const getData = async () => {
          await fetchData(game.gamecode, game.players, setGame, "players");
          await fetchData(game.gamecode, game.time, setGame, "time");
          await fetchData(
            game.gamecode,
            game.startingTime,
            setGame,
            "startingTime"
          );
          await fetchData(
            game.gamecode,
            game.hostConnection,
            setGame,
            "hostConnection"
          );

          await fetchPlayerData(
            game.gamecode,
            points,
            setPoints,
            "points",
            player.id
          );
          await fetchPlayerData(
            game.gamecode,
            shownComponent,
            setShownComponent,
            "shownComponent",
            player.id
          );
          getOnShownComponent(game.gamecode, player.id, setShownComponent);
          getOnPlayerPoints(game.gamecode, player.id, setPoints)
          setShowPage(true)
        };
        getData();
      }
    }
  }, [game.gamecode, playerName, player]);

  useEffect(() => {
    if (game.gamePhase == game.gameTemplate.allQuestions.length * 2 + 1) {
      fetchData(game.gamecode, game.winners, setGame, "winners");
      setShownComponent("winners");
    } else if (game.gamePhase % 2 == 0) {
      setShownComponent("between");
    } else if (game.gamePhase % 2 == 1) {
      setShownComponent("answers");
    }
  }, [game.gamePhase]);

  useEffect(() => {
    if (player && shownComponent) {
      setDataInDB(game.gamecode, shownComponent, "shownComponent", player?.id);
    }
  }, [shownComponent]);


  useEffect(()=>{
    if(player && game.players){
      setLastQuestionPoints(pointsForLast(game, player!.id))
    }
  },[game.players, game.gamePhase])

  return (
    <>
      <UnloadPrompt />
      {player && <PlayerBar player={player!} points={points} />}
      {showPage && game.hostConnection ? (
        <>
        <div
          className="column-shaped-container"
          style={{
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          {shownComponent == "answers" && game.started == "started" && (
            <AnswerPage
              gameState={game}
              setGame={setGame}
              setShownComponent={setShownComponent}
              username={state.username}
            />
          )}
          {shownComponent == "between" && game.started == "started" && (
            <BetweenQuestions
              gameState={game}
              lastQuestionPoints={lastQuestionPoints}
            />
          )}
          {shownComponent == "winners" &&
            game.started == "winners" &&
            game.winners && <Winners winners={game.winners} />}
            </div>
        </>
      ) : (
        <Waiting
          message="Waiting for host to reconnect"
          time={reconnectionTime}
          setTime={setReconnectionTime}
        />
      )}
    </>
  );
}

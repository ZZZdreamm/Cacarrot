import { useEffect, useState } from "react";
import {
  getGameData,
  getGameStart,
  getOnShownComponent,
  getPlayer,
  getTimeFromDB,
  sendAnswerToDB,
  setPointsForPlayer,
  fetchData,
  setDataInDB,
  getOnWinners,
  getOnIfHostConnected,
} from "../FirebaseDatabase/GamesInDB";
import { useLocation } from "react-router-dom";
import { Answer, Game, Player } from "./game.models";
import AnswerPage from "./AnswerPage";
import Statistics from "./Statistics";
import Winners from "./Winners";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import BetweenQuestions from "./BetweenQuestions";
import { getWinners, playerLeavesGame } from "./FunctionsGame";
import { IfConnected } from "../Utilities/Connected";
import PlayerBar from "./Player";
import Waiting from "../Utilities/Waiting";
import { socket } from "../App";

export default function GamePlayer() {
  const location = useLocation();
  const { state } = location;

  const [game, setGame] = useState<Game>(state.game);
  const [time, setTime] = useState(state.game.gameTemplate.questionTime);
  const [shownComponent, setShownComponent] = useState<string | null>(null);
  const [questionDone, setQuestionDone] = useState<number>(0);
  const [players, setPlayers] = useState<Player[] | null>([]);
  const [winners, setWinners] = useState<Player[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [player, setPlayer] = useState<Player>();
  const [lastQuestionPoints, setLastQuestionPoints] = useState(0);
  const [lastAnswer, setLastAnswer] = useState<Answer>();
  const [gameStart, setGameStart] = useState<string>("started");
  const [startingTime, setStartingTime] = useState();

  const [activeEffects, setActiveEffects] = useState<string[]>([])
  const [connected, setConnected] = useState(false);
  const [reconnectionTime, setReconnectionTime] = useState(() => {
    const storedTime = localStorage.getItem('time')
    if(storedTime && storedTime != 'undefined'){
      return parseInt(JSON.parse(storedTime))
    }else{
      return 15
    }
  })

  const minusPointsForSecond = Math.round(
    1000 / state.game.gameTemplate.questionTime
  );
  const playerName = state.username
    ? state.username
    : localStorage.getItem(`username/${state.playerNumber}`);



  useEffect(() => {
    getGameData(state.game.gamecode, setGame);
    getTimeFromDB(game?.gamecode, setTime);
    getGameStart(game.gamecode, setGameStart);
    getOnIfHostConnected(game.gamecode, setConnected)
  }, []);

  useEffect(() => {
    if (lastAnswer && (game.currentQuestion || game.currentQuestion == 0)) {
      if (
        game.gameTemplate.allQuestions[game.currentQuestion].correctAnswer ==
          lastAnswer.choosenAnswer &&
        game.currentQuestion == lastAnswer.questionNumber
      ) {
        setLastQuestionPoints(
          1000 - minusPointsForSecond * lastAnswer.sendingTime
        );
      }
    }
  }, [lastAnswer, game.currentQuestion]);

  useEffect(() => {
    if (game.gamecode && playerName) {
      if (!player) {
        getPlayer(game.gamecode, playerName, setPlayer);
      }
      if (player) {
        fetchData(game.gamecode, players, setPlayers, "players");
        fetchData(game.gamecode, questionDone, setQuestionDone, "questionDone");
        fetchData(game.gamecode, points, setPoints, "points", player.id);
        fetchData(
          game.gamecode,
          shownComponent,
          setShownComponent,
          "shownComponent",
          player.id
        );
        fetchData(game.gamecode, time, setTime, "time");
        fetchData(
          game.gamecode,
          lastAnswer,
          setLastAnswer,
          "lastAnswer",
          player.id
        );
        fetchData(game.gamecode, startingTime, setStartingTime, "startingTime");
        getOnWinners(game.gamecode, setWinners);
        getOnShownComponent(game.gamecode, player.id, setShownComponent);
      }
    }
  }, [game.gamecode, playerName, player]);

  useEffect(() => {
      if (game.gamePhase == game.gameTemplate.allQuestions.length * 2+1) {
        getWinners(game.players!, setWinners);
        setShownComponent("winners");
      } else if (shownComponent == "answers" && game.gamePhase % 2 == 0) {
        setShownComponent("between");
      } else if (
        shownComponent == "between" &&
        game.gamePhase % 2 == 1
      ) {
        setShownComponent("answers");
      }
  }, [game.gamePhase]);

  useEffect(() => {
    setPlayers(game?.players!);
  }, [game?.players]);

  useEffect(() => {
    setWinners(game.winners);
  }, [game.winners]);

  useEffect(() => {
    if (player && shownComponent) {
      setDataInDB(game.gamecode, shownComponent, "shownComponent", player?.id);
    }
  }, [shownComponent]);

  function setPointsGivenLast(answer: Answer) {
    socket.emit("send-answer", {gamecode:game.gamecode, answer:answer})
    // if (
    //   game.gameTemplate.allQuestions[game.currentQuestion].correctAnswer ==
    //     answer.choosenAnswer &&
    //   game.currentQuestion == answer.questionNumber
    // ) {
    //   setPoints((points) => {
    //     let newPoints = 1000 - minusPointsForSecond * answer.sendingTime;
    //     if(activeEffects.includes('DoubleNext')){
    //       newPoints = newPoints*2
    //     }
    //     setLastQuestionPoints(newPoints);
    //     setPoints(points + newPoints);
    //     setPointsForPlayer(game.gamecode, state.username, points + newPoints);
    //     return points + newPoints;
    //   });
    // }else{
    //   setLastQuestionPoints(0);
    // }
  }

  return (
    <>
      <UnloadPrompt/>
      {player &&
      <PlayerBar player={player!} points={points}/>
}
      {connected ? (
        <>
          {shownComponent == "answers" && gameStart == "started" && (
            <AnswerPage
              gameState={game}
              time={time}
              setShownComponent={setShownComponent}
              username={state.username}
              setPointsForLast={setPointsGivenLast}
              setLastAnswer={setLastAnswer}
            />
          )}
          {shownComponent == "between" && gameStart == "started" && (
            <BetweenQuestions
              gameState={game}
              setShownComponent={setShownComponent}
              questionDone={questionDone}
              setQuestionsDone={setQuestionDone}
              setTime={setTime}
              lastQuestionPoints={lastQuestionPoints}
              setLastQuestionPoints={setLastQuestionPoints}
              player={player!}
              points={points}
              setPoints={setPoints} setActiveEffects={setActiveEffects} />
          )}
          {shownComponent == "winners" && gameStart == "winners" && winners && (
            <Winners winners={winners} />
          )}
        </>
      ) : (
        <Waiting message="Waiting for host to reconnect" time={reconnectionTime} setTime={setReconnectionTime}/>
      )
      }
    </>
  );
}

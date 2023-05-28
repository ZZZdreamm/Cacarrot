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
} from "../FirebaseDatabase/GamesInDB";
import { useLocation } from "react-router-dom";
import { Answer, Game, Player } from "./game.models";
import AnswerPage from "./AnswerPage";
import Statistics from "./Statistics";
import Winners from "./Winners";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import BetweenQuestions from "./BetweenQuestions";
import { getWinners } from "./FunctionsGame";

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
  const [startingTime, setStartingTime] = useState()

  const minusPointsForSecond = Math.round(1000 / state.game.gameTemplate.questionTime);
  const playerName = state.username ? state.username : localStorage.getItem(`username/${state.playerNumber}`);

  useEffect(() => {
    getGameData(state.game.gamecode, setGame);
    getTimeFromDB(game?.gamecode, setTime);
    getGameStart(game.gamecode, setGameStart);
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
        fetchData(game.gamecode, startingTime, setStartingTime, 'startingTime')
        getOnShownComponent(game.gamecode, player.id, setShownComponent);
      }
    }
  }, [game.gamecode, playerName, player]);

  useEffect(() => {
    if (time < 1) {
      if (game.gamePhase == game.gameTemplate.allQuestions.length * 2) {
        getWinners(players!, setWinners);
        setShownComponent("winners");
      } else if (shownComponent == "answers" && game.gamePhase % 2 == 1) {
        setShownComponent("between");
      } else if (
        shownComponent == "between" &&
        questionDone < state.game.gameTemplate.allQuestions.length &&
        game.gamePhase % 2 == 0
      ) {
        setShownComponent("answers");
      }
    }
  }, [time]);

  useEffect(() => {
    setPlayers(game?.players!);
  }, [game?.players]);

  useEffect(() => {
    if (game?.started == "winners") {
      getWinners(players!, setWinners);
      setShownComponent("winners");
    }
  }, [game?.started]);

  useEffect(() => {
    if (player && shownComponent) {
      setDataInDB(game.gamecode, shownComponent, "shownComponent", player?.id);
    }
  }, [shownComponent]);

  function setPointsGivenLast(answer: Answer) {
    if (
      game.gameTemplate.allQuestions[game.currentQuestion].correctAnswer ==
        answer.choosenAnswer &&
      game.currentQuestion == answer.questionNumber
    ) {
      setPoints((points) => {
        const newPoints = 1000 - minusPointsForSecond * answer.sendingTime;
        setLastQuestionPoints(newPoints);
        setPoints(points + newPoints);
        setPointsForPlayer(game.gamecode, state.username, points + newPoints);
        return points + newPoints;
      });
    }
  }

  return (
    <>
      <UnloadPrompt />
      {shownComponent == "answers" && gameStart == "started" && (
        <AnswerPage
          gameState={game}
          time={time}
          setShownComponent={setShownComponent}
          username={state.username}
          setPointsForLast={setPointsGivenLast}
          setLastAnswer={setLastAnswer}/>
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
        />
      )}
      {shownComponent == "winners" && gameStart == "winners" && (
        <Winners winners={winners} />
      )}
    </>
  );
}

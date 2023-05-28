import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import { Question } from "../GameTemplate/questions.models";
import ShownQuestion from "./ShownQuestion";
import Statistics from "./Statistics";
import Winners from "./Winners";
import {
  getGameData,
  setCurrentQuestionInDB,
  fetchData,
  setDataInDB,
} from "../FirebaseDatabase/GamesInDB";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import { getWinners } from "./FunctionsGame";

export default function GameHost() {
  const location = useLocation();
  const { state } = location;
  const gameData: Game = state.gamestate;
  const [game, setGame] = useState(gameData);
  const gamecode = gameData.gamecode;
  const [shownComponent, setShownComponent] = useState("question");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>();
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    game.gameTemplate.allQuestions[0]
  );
  const [players, setPlayers] = useState(game.players);
  const [winners, setWinners] = useState<Player[]>([]);
  const [time, setTime] = useState<number>();
  const [gamePhase, setGamePhase] = useState<number>();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (
      (time || time == 0) &&
      (currentQuestionIndex || currentQuestionIndex == 0) &&
      shownComponent
    ) {
      setShowPage(true);
    }
  }, [currentQuestionIndex, gamePhase, time]);

  useEffect(() => {
    if (gamecode) {
      fetchData(gamecode, time, setTime, "time");
      fetchData(gamecode, gamePhase, setGamePhase, "gamePhase");
      fetchData(gamecode, 0, setCurrentQuestionIndex, "currentQuestionIndex");
      getGameData(gamecode, setGame, true);
    }
  }, [gamecode]);

  useEffect(() => {
    if (gamePhase) {
      if (gamePhase == game.gameTemplate.allQuestions.length * 2 + 1) {
        setDataInDB(game.gamecode, "winners", "gameStarted");
        getWinners(players, setWinners);
      } else if (gamePhase % 2 == 0) {
        setShownComponent("statistics");
      } else if (gamePhase % 2 == 1) {
        if (
          (time || time == 0) &&
          time < 1 &&
          (currentQuestionIndex || currentQuestionIndex == 0)
        ) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        setShownComponent("question");
      }
      if ((time || time == 0) && time < 1) {
        setTime(game.gameTemplate.questionTime);
      }
    }
  }, [gamePhase]);

  useEffect(() => {
    if (time || time == 0) {
      setDataInDB(game.gamecode, time, "time");
      if (time < 1 && gamePhase) {
        setGame({
          ...game,
          gamePhase: game.gamePhase + 1,
        });
        setGamePhase(gamePhase + 1);
        setDataInDB(game.gamecode, game.gamePhase + 1, "gamePhase");
      }
    }
  }, [time]);
  useEffect(() => {
    if (currentQuestionIndex) {
      setCurrentQuestion(game.gameTemplate.allQuestions[currentQuestionIndex]);
      setCurrentQuestionInDB(game.gamecode, currentQuestionIndex);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (winners.length == 3) {
      setShownComponent("winners");
    }
  }, [winners]);

  useEffect(() => {
    getGameData(game.gamecode, setGame, false);
  }, []);

  useEffect(() => {
    if (currentQuestionIndex) {
      setCurrentQuestionInDB(game.gamecode, currentQuestionIndex);
    }
  }, [shownComponent]);

  useEffect(() => {
    setPlayers(game.players);
  }, [game.players]);

  return (
    <>
      <UnloadPrompt />
      {showPage && (
        <div
          className="column-shaped-container"
          style={{
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          {shownComponent == "question" && (
            <ShownQuestion
              currentQuestion={currentQuestion}
              time={time!}
              setTime={setTime}
              gamecode={game.gamecode}
            />
          )}
          {shownComponent == "statistics" && (
            <Statistics
              time={time!}
              setTime={setTime}
              players={players}
              setPlayers={setPlayers}
              gamecode={game.gamecode}
            />
          )}
          {shownComponent == "winners" && <Winners winners={winners} />}
        </div>
      )}
    </>
  );
}

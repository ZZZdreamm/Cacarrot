import { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import { Question } from "../Questions/questions.models";
import { ReadyImagesURL } from "../appUrls";
import Timer from "../Utilities/Timer";
import ShownQuestion from "./ShownQuestion";
import Statistics from "./Statistics";
import Winners from "./Winners";
import {
  getGameData,
  sendGameData,
  setCurrentQuestionInDB,
  setGameStarted,
  setTimeInDB,
} from "../FirebaseDatabase/FirebaseConfig";
import { fetchData, setDataInDB } from "../Utilities/StateModifications";

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
  const [showPage, setShowPage] = useState(false)


  useEffect(()=>{
    if((time || time ==0) && (currentQuestionIndex  || currentQuestionIndex == 0) && shownComponent){
      setShowPage(true)
    }
  },[currentQuestionIndex, gamePhase, time])

  useEffect(() => {
    if (gamecode) {
      fetchData(gamecode, time, setTime, "time");
      fetchData(gamecode, gamePhase, setGamePhase, "gamePhase");
      // nie tu
      fetchData(gamecode, 0, setCurrentQuestionIndex, 'currentQuestionIndex')
      getGameData(gamecode, setGame, true);
    }
  }, [gamecode]);

  useEffect(() => {
    if (gamePhase) {
      if (gamePhase == game.gameTemplate.allQuestions.length * 2 + 1) {
        setGameStarted(game.gamecode, "winners");
        getWinners();
      } else if (gamePhase % 2 == 0) {
        setShownComponent("statistics");
      } else if (gamePhase % 2 == 1) {
        if ((time || time == 0) && time < 1 && (currentQuestionIndex || currentQuestionIndex == 0)) {
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
      setTimeInDB(game.gamecode, time);
      if (time < 1 && gamePhase) {
        // console.log(game);
        setGame({
          ...game,
          gamePhase: game.gamePhase + 1,
        });
        setGamePhase(gamePhase + 1);
        setDataInDB(game.gamecode, game.gamePhase + 1, "gamePhase");
        // if (gamePhase == game.gameTemplate.allQuestions.length * 2) {
        //   setGameStarted(game.gamecode, "winners");
        //   getWinners();
        // } else if (gamePhase % 2 == 1) {
        //   setShownComponent("statistics");
        // } else if (gamePhase % 2 == 0) {
        //   setCurrentQuestionIndex(currentQuestionIndex + 1);
        //   setShownComponent("question");
        // }
        // setTime(game.gameTemplate.questionTime);
        // if (
        //   currentQuestionIndex < game.gameTemplate.allQuestions.length - 1 &&
        //   shownComponent == "statistics"
        // ) {
        //   setCurrentQuestionIndex(currentQuestionIndex + 1);
        // }

        // if(shownComponent == 'question' && currentQuestionIndex <= game.gameTemplate.allQuestions.length - 1){
        //   setShownComponent('statistics')
        //   setTime(game.gameTemplate.questionTime);
        // }else if (shownComponent == 'statistics' && currentQuestionIndex+1 <= game.gameTemplate.allQuestions.length - 1) {
        //   setShownComponent("question");
        //   setTime(game.gameTemplate.questionTime);
        // }else{
        //   setGameStarted(game.gamecode, 'winners')
        //   getWinners()
        // }
      }
    }
  }, [time]);
  useEffect(() => {
    if(currentQuestionIndex){
      setCurrentQuestion(game.gameTemplate.allQuestions[currentQuestionIndex]);
      setCurrentQuestionInDB(game.gamecode, currentQuestionIndex);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (winners.length == 3) {
      setShownComponent("winners");
    }
  }, [winners]);

  function getWinners() {
    let localWinners = players.sort(
      (player1, player2) => player2.points - player1.points
    );
    setWinners([localWinners[0], localWinners[1], localWinners[2]]);
  }


  useEffect(() => {
    getGameData(game.gamecode, setGame, false);
  }, []);

  useEffect(() => {
    if(currentQuestionIndex){
      setCurrentQuestionInDB(game.gamecode, currentQuestionIndex);
    }
  }, [shownComponent]);

  useEffect(() => {
    setPlayers(game.players);
  }, [game.players]);


  return (
    <>
    {showPage && <div
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
            time={time}
            setTime={setTime}
          />
        )}
        {shownComponent == "statistics" && (
          <Statistics
            time={time}
            setTime={setTime}
            players={players}
            setPlayers={setPlayers}
          />
        )}
        {shownComponent == "winners" && <Winners winners={winners} />}
      </div>}
    </>
  );
}

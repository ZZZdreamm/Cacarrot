import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import { Question } from "../Questions/questions.models";
import { ReadyImagesURL } from "../appUrls";
import Timer from "../Utilities/Timer";
import ShownQuestion from "./ShownQuestion";
import Statistics from "./Statistics";
import Winners from "./Winners";
import { getGameData, sendGameData, setCurrentQuestionInDB, setGameStarted } from "../FirebaseDatabase/FirebaseConfig";

export default function GameHost() {
  const location = useLocation();
  const { state } = location;
  const gameData: Game = state.gamestate;
  const [game, setGame] = useState(gameData)
  const questions = game.gameTemplate.allQuestions;
  const [shownComponent, setShownComponent] = useState("question");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [players, setPlayers] = useState(game.players)
  const [winners, setWinners] = useState<Player[]>([])
  const [time, setTime] = useState(game.gameTemplate.questionTime);

  useEffect(() => {
    if (time < 1) {
      setTime(game.gameTemplate.questionTime);
      if (
        currentQuestionIndex < questions.length - 1 &&
        shownComponent == "statistics"
      ) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      if(shownComponent == 'question' && currentQuestionIndex <= questions.length - 1){
        setShownComponent('statistics')
      }else if (shownComponent == 'statistics' && currentQuestionIndex+1 <= questions.length - 1) {
        setShownComponent("question");
      }else{
        setGameStarted(game.gamecode, 'winners')
        getWinners()
      }
    }
  }, [time]);
  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
    setCurrentQuestionInDB(game.gamecode, currentQuestionIndex)
  }, [currentQuestionIndex]);

  useEffect(()=>{
    if(winners.length == 3){
      setShownComponent('winners')
    }
  },[winners])


  function getWinners(){
    let localWinners = players.sort((player1, player2) => player2.points - player1.points)
    setWinners([localWinners[0], localWinners[1], localWinners[2]])
  }

  useEffect(()=>{
    getGameData(game.gamecode, setGame)
  },[])


  useEffect(()=>{
    sendGameData(game.gamecode, game)
    setCurrentQuestionInDB(game.gamecode, currentQuestionIndex)
  },[shownComponent])

  useEffect(()=>{
    setPlayers(game.players)
  },[game.players])

  return (
    <>
      <div
        className="column-shaped-container"
        style={{ justifyContent: "space-between", width:'100%', height:'100%' }}
      >
        {shownComponent == "question" && (
            <ShownQuestion currentQuestion={currentQuestion} time={time} setTime={setTime} />
        ) }
        {shownComponent == 'statistics' && (
            <Statistics time={time} setTime={setTime} players={players} setPlayers={setPlayers}/>
        )}
        {shownComponent == 'winners' && (
            <Winners winners={winners}/>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import Timer from "../Utilities/Timer";
import {
  getGameData,
  getGameStart,
  getOnShownComponent,
  getPlayer,
  getTimeFromDB,
  sendAnswerToDB,
  setPointsForPlayer,
  setShownComponentInDB,
} from "../FirebaseDatabase/FirebaseConfig";
import { useFetcher, useLocation } from "react-router-dom";
import { Answer, Game, Player } from "./game.models";
import AnswerPage from "./AnswerPage";
import Statistics from "./Statistics";
import Winners from "./Winners";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import BetweenQuestions from "./BetweenQuestions";
import { fetchData } from "../Utilities/StateModifications";

export default function GamePlayer() {
  const location = useLocation();
  //@ts-ignore
  const { state } = location;
//   const [gameState, setGameState] = useState()
  const [game, setGame] = useState<Game>(state.game);
  const [time, setTime] = useState(state.game.gameTemplate.questionTime);
  const [shownComponent, setShownComponent] = useState<string | null>(null);
  const [questionDone, setQuestionDone] = useState<number>(0);
  const [players, setPlayers] = useState<Player[] | null>([]);
  const [winners, setWinners] = useState<Player[]>([]);
  const [points, setPoints] = useState<number>(0);

  const [playerName, setPlayerName] = useState('')
  const [player, setPlayer] = useState<Player>()
  const [lastQuestionPoints, setLastQuestionPoints] = useState(0)
  const [lastAnswer, setLastAnswer] = useState<Answer>()

  const [gameStart, setGameStart] = useState<string>('started')



  useEffect(() => {
    getGameData(state.game.gamecode, setGame);
    const getName = state.username ? state.username : localStorage.getItem('username')
    setPlayerName(getName)
    getTimeFromDB(game?.gamecode, setTime)

    getGameStart(game.gamecode, setGameStart)

    // getDataPreviousValue(setGameState, 'gameState', state)
    // getDataPreviousValue(setPlayers, 'players', game?.players)
    // getDataPreviousValue(setQuestionDone, 'questionDone', 0)
    // getDataPreviousValue(setPoints, 'points', 0)
    // getDataPreviousValue(setShownComponent, 'shownComponent', 'answers')
    // getDataPreviousValue(setTime, 'time', state.game.gameTemplate.questionTime)
    // getDataPreviousValue(setGame, 'game', )
  }, []);

  useEffect(()=>{
    if(lastAnswer && (game.currentQuestion || game.currentQuestion == 0)){
      if(game.gameTemplate.allQuestions[game.currentQuestion].correctAnswer == lastAnswer.choosenAnswer && game.currentQuestion == lastAnswer.questionNumber){
        setLastQuestionPoints(1000 - 100*lastAnswer.sendingTime)
      }
    }
  },[lastAnswer, game.currentQuestion])

  useEffect(()=>{
    if(game.gamecode && playerName){
      // getTimeFromDB(game?.gamecode, setTime)

      if(!player){
        getPlayer(game.gamecode, playerName, setPlayer)
      }
      if(player){
        fetchData(game.gamecode, players, setPlayers, 'players')
        fetchData(game.gamecode, questionDone, setQuestionDone, 'questionDone')
        fetchData(game.gamecode, points, setPoints, 'points', player.id)
        fetchData(game.gamecode, shownComponent, setShownComponent, 'shownComponent', player.id)
        fetchData(game.gamecode, time, setTime, 'time')
        fetchData(game.gamecode, lastAnswer, setLastAnswer, 'lastAnswer', player.id)
        getOnShownComponent(game.gamecode, player.id, setShownComponent)
      }
    }
  },[game.gamecode, playerName, player])

  useEffect(() => {
    if (time < 1) {
      // setQuestionDone(questionDone+1)
      // setTime(state.game.gameTemplate.questionTime);
      setTimeout(() => {
        if(game.gamePhase == game.gameTemplate.allQuestions.length*2){
          getWinners()
          setShownComponent("winners");
        }
        else if (shownComponent == "answers" && game.gamePhase%2 == 1) {
          setShownComponent("between");
        } else if (
          shownComponent == "between" &&
          questionDone < state.game.gameTemplate.allQuestions.length
          && game.gamePhase%2 == 0
        ) {
          setShownComponent("answers");
        }
      }, 500);
    }

  }, [time]);

  useEffect(() => {
    setPlayers(game?.players!);
  }, [game?.players]);



  useEffect(() => {
    if (game?.started == 'winners') {
        getWinners()
      setShownComponent("winners");
    }
  }, [game?.started]);

  function getWinners() {
    //@ts-ignore
    let localWinners = game.players.sort(
      (player1, player2) => player2.points - player1.points
    );
    setWinners([localWinners[0], localWinners[1], localWinners[2]]);
  }




  function getDataPreviousValue(setData: any, dataName: string, defaultValue:any) {
    const storedData = localStorage.getItem(dataName);
    if (storedData && storedData != 'undefined') {
      setData(JSON.parse(storedData));
    }
    else {
      setData(defaultValue);
    }
  }


  useEffect(()=>{
    if(player && shownComponent){
      setShownComponentInDB(game.gamecode, shownComponent, player?.id)
    }
  },[shownComponent])

  useEffect(()=>{
    if(game){
        localStorage.setItem('game', JSON.stringify(game))
    }
  },[game])

  function setPointsGivenLast(answer:Answer){
    // console.log('points given')
    // let answer :Answer = {choosenAnswer:'', sendingTime:0, questionNumber:0}
    // game.players.forEach((player:Player) => {
    //     if(player.name == state.username){
    //         answer = player.lastAnswer
    //     }
    // });
    console.log(answer)
    console.log(game.gameTemplate.allQuestions[game.currentQuestion])
    if(game.gameTemplate.allQuestions[game.currentQuestion].correctAnswer == answer.choosenAnswer && game.currentQuestion == answer.questionNumber){
        setPoints((points) => {
            const newPoints = 1000 - 100*answer.sendingTime
            setLastQuestionPoints(newPoints)
            setPoints(points + newPoints)
            setPointsForPlayer(game.gamecode, state.username, points+newPoints);
            return (points+newPoints)
        })
    }
  }

  return (
    <>
      {shownComponent == "answers" && gameStart == 'started' && (
        <AnswerPage
          gameState={game}
          time={time}
          setTime={setTime}
          setShownComponent={setShownComponent}
          username={state.username}
          setPointsForLast={setPointsGivenLast} lastAnswer={lastAnswer} setLastAnswer={setLastAnswer}        />
      )}
      {/* {shownComponent == 'statistics' && <Statistics time={time} setTime={setTime} players={players} setPlayers={setPlayers}/>} */}
      {shownComponent == "between" && gameStart == 'started'  && (
        <BetweenQuestions
          gameState={game}
          player={player}
          setShownComponent={setShownComponent}
          questionDone={questionDone}
          setQuestionsDone={setQuestionDone}
          setTime={setTime}
          points={points}
          setPoints={setPoints}
          lastQuestionPoints={lastQuestionPoints}
          setLastQuestionPoints={setLastQuestionPoints}
        />
      )}
      {shownComponent == "winners" && gameStart == 'winners' && <Winners winners={winners} />}
    </>
  );
}

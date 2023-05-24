import { useEffect, useState } from "react"
import Timer from "../Utilities/Timer"
import { getGameData, leaveGame, sendAnswerToDB, setPointsForPlayer } from "../FirebaseDatabase/FirebaseConfig"
import { useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import AnswerPage from "./AnswerPage";
import Statistics from "./Statistics";
import Winners from "./Winners";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import BetweenQuestions from "./BetweenQuestions";

export default function GamePlayer(){
    const location = useLocation();
    //@ts-ignore
    const { state } = location;
    const [game, setGame] = useState<Game>()
    const [time, setTime] = useState(state.game.gameTemplate.questionTime)
    const [shownComponent, setShownComponent] = useState('answers')
    const [questionDone, setQuestionDone] = useState(0)
    const [players, setPlayers] = useState(game?.players)
    const [winners, setWinners] = useState<Player[]>([])
    const [points, setPoints] = useState(0)


    useEffect(()=>{
        getGameData(state.game.gamecode, setGame)
    },[])

    useEffect(()=>{
        if(time < 1){
            // setQuestionDone(questionDone+1)
            setTime(state.game.gameTemplate.questionTime)
            if(shownComponent == 'answers'){
                setShownComponent('between')
            }else if(shownComponent == 'between' && questionDone < state.game.gameTemplate.allQuestions.length){
                setShownComponent('answers')
            }else{
                getWinners()
            }
        }
    },[time])

    useEffect(()=>{
        setPlayers(game?.players)
    },[game?.players])

    useEffect(()=>{
        setPointsForPlayer(state.game.gamecode, state.username, points)
    },[points])

    useEffect(()=>{
        if(winners.length == 3){
            setShownComponent('winners')
        }
    },[winners])



    function getWinners(){
        //@ts-ignore
        let localWinners = game.players.sort((player1, player2) => player2.points - player1.points)
        setWinners([localWinners[0], localWinners[1], localWinners[2]])
      }


    return(
        <>
            {shownComponent == 'answers' && <AnswerPage gameState={state} time={time} setTime={setTime} setShownComponent={setShownComponent}/>}
            {/* {shownComponent == 'statistics' && <Statistics time={time} setTime={setTime} players={players} setPlayers={setPlayers}/>} */}
            {shownComponent == 'between' && <BetweenQuestions gameState={game} username={state.username} setShownComponent={setShownComponent} questionDone={questionDone} setQuestionsDone={setQuestionDone} setTime={setTime} points={points} setPoints={setPoints}/>}
            {shownComponent == 'winners' && <Winners winners={winners}/>}
        </>

    )
}
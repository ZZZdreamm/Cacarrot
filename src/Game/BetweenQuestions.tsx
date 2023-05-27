import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { getCurrentQuestionFromDB, getGameStart, getQuestionsDoneFromDB, setPointsForPlayer } from "../FirebaseDatabase/FirebaseConfig";
import { Answer, Player } from "./game.models";

//@ts-ignore
export default function BetweenQuestions({gameState, player , setShownComponent, questionDone,  setQuestionsDone, setTime, points, setPoints, lastQuestionPoints, setLastQuestionPoints}){
    // const [pointsForQuestion, setPointsForQuestion] = useState(lastQuestionPoints)
    const [currentQuestion, setCurrentQuestion] = useState(0)


    useEffect(()=>{
        getQuestionsDoneFromDB(gameState.gamecode, setQuestionsDone)
        getCurrentQuestionFromDB(gameState.gamecode, setCurrentQuestion)
    },[])

    useEffect(()=>{
        if(currentQuestion > questionDone){
            setTime(gameState.gameTemplate.questionTime)
            setLastQuestionPoints(0)
            setShownComponent('answers')
        }
    },[currentQuestion])


    return(
        <>
        <div className="answer-result-container">
            <div>+ {lastQuestionPoints}</div>
            <img src={`${ReadyImagesURL}/loading.gif`}/>
        </div>
        </>
    )
}
import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { fetchData, getCurrentQuestionFromDB, getGameStart, setPointsForPlayer } from "../FirebaseDatabase/GamesInDB";
import { Answer, Player } from "./game.models";

//@ts-ignore
export default function BetweenQuestions({gameState, player , setShownComponent, questionDone,  setQuestionsDone, setTime, points, setPoints, lastQuestionPoints, setLastQuestionPoints}){
    const [currentQuestion, setCurrentQuestion] = useState(0)

    useEffect(()=>{
        fetchData(gameState.gamecode, questionDone, setQuestionsDone, 'questionDone')
        getCurrentQuestionFromDB(gameState.gamecode, setCurrentQuestion)
    },[])

    useEffect(()=>{
        if(currentQuestion > questionDone){
            setTime(gameState.gameTemplate.questionTime)
            setLastQuestionPoints(0)
            setShownComponent('answers')
        }
    },[currentQuestion])

    const answerEffectImage = lastQuestionPoints != 0 ? `good-answer.png` : `wrong-answer.png`
    const answerText = lastQuestionPoints != 0 ? `Good answer!` : `Wrong answer!`
    return(
        <>
        <div className="answer-result-container">
            <img className="circle-image" src={`${ReadyImagesURL}/${answerEffectImage}`} alt="Answer" style={{width:'50%', aspectRatio:1}}/>
            <h2>{answerText}</h2>
            <h4>+ {lastQuestionPoints} points</h4>
        </div>
        </>
    )
}
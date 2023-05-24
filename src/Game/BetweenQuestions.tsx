import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { getCurrentQuestionFromDB, getGameStart, getQuestionsDoneFromDB } from "../FirebaseDatabase/FirebaseConfig";
import { Answer, Player } from "./game.models";

//@ts-ignore
export default function BetweenQuestions({gameState, username , setShownComponent, questionDone,  setQuestionsDone, setTime, points, setPoints}){
    const [pointsForQuestion, setPointsForQuestion] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [gameStart, setGameStart] = useState<string>('started')
    useEffect(()=>{
        getQuestionsDoneFromDB(gameState.gamecode, setQuestionsDone)
        getCurrentQuestionFromDB(gameState.gamecode, setCurrentQuestion)
        getGameStart(gameState.gamecode, setGameStart)
    },[])

    useEffect(()=>{
        let answer :Answer = {choosenAnswer:'', sendingTime:0, questionNumber:0}
        gameState.players.forEach((player:Player) => {
            if(player.name == username){
                answer = player.lastAnswer
            }
        });
        console.log(gameState.gameTemplate.allQuestions[questionDone])
        console.log(answer)
        if(gameState.gameTemplate.allQuestions[questionDone].correctAnswer == answer.choosenAnswer && questionDone == answer.questionNumber-1){
            setPoints(() => {
                const newPoints = 1000 - 100*answer.sendingTime
                setPointsForQuestion(newPoints)
                setPoints(points + newPoints)
            })
        }
    },[questionDone])


    useEffect(()=>{
        if(currentQuestion > questionDone){
            setTime(gameState.gameTemplate.questionTime)
            setShownComponent('answers')
        }
    },[currentQuestion])

    useEffect(()=>{
        if(gameStart == 'winners'){
            setShownComponent('winners')
        }
    },[gameStart])

    return(
        <>
        <div className="answer-result-container">
            <div>+ {pointsForQuestion}</div>
            <img src={`${ReadyImagesURL}/loading.gif`}/>
        </div>
        </>
    )
}
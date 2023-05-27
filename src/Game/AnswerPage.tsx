import { useEffect, useState } from "react"
import { checkIfAnswerSended, sendAnswerToDB } from "../FirebaseDatabase/FirebaseConfig"
import Timer from "../Utilities/Timer"

//@ts-ignore
export default function AnswerPage({gameState, time, setTime, setShownComponent, username, setPointsForLast, lastAnswer, setLastAnswer}){
    const [answerSended, setAnswerSended] = useState(false)

    const sendAnswer = (answer:string) => {
        return async () => {
            const sendingTime = gameState.gameTemplate.questionTime - time
            await sendAnswerToDB(gameState.gamecode, username, answer, gameState.currentQuestion, sendingTime)
            setAnswerSended(true)
            const yourAnswer = {choosenAnswer:answer, sendingTime:sendingTime, questionNumber:gameState.currentQuestion}
            setLastAnswer(yourAnswer)
            setPointsForLast(yourAnswer)
            setShownComponent('between')
        }
    }


    useEffect(()=>{
        if(time < 1){
            checkIfAnswerSended(gameState.gamecode, username, setAnswerSended)
        }
    },[time])

    useEffect(()=> {
        if(time < 1 && !answerSended){
            sendAnswer('')
        }
    },[answerSended])

    return(
        <>
            <Timer time={time} setTime={()=>{}} bonusStyling={{top:'0%'}}/>
            <div className="grid-container">
                <div id="answer-A" onClick={sendAnswer('A')}></div>
                <div id="answer-B" onClick={sendAnswer('B')}></div>
                <div id="answer-C" onClick={sendAnswer('C')}></div>
                <div id="answer-D" onClick={sendAnswer('D')}></div>
            </div>
        </>
    )
}
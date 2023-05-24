import { useEffect, useState } from "react"
import { sendAnswerToDB } from "../FirebaseDatabase/FirebaseConfig"
import Timer from "../Utilities/Timer"

//@ts-ignore
export default function AnswerPage({gameState, time, setTime, setShownComponent}){
    const [answerSended, setAnswerSended] = useState(false)
    async function sendAnswer(answer:string){
        const sendingTime = gameState.game.gameTemplate.questionTime - time
        await sendAnswerToDB(gameState.game.gamecode, gameState.username, answer, gameState!.game.currentQuestion, sendingTime)
        setAnswerSended(true)
        setShownComponent('between')
    }

    useEffect(()=>{
        if(time < 1){
            if(!answerSended){
                sendAnswer('')
            }
        }
    },[time])

    return(
        <>
            <Timer time={time} setTime={setTime} bonusStyling={{top:'0%'}}/>
            <div className="grid-container">
                <div id="answer-A" onClick={()=>{sendAnswer('A')}}></div>
                <div id="answer-B" onClick={()=>{sendAnswer('B')}}></div>
                <div id="answer-C" onClick={()=>{sendAnswer('C')}}></div>
                <div id="answer-D" onClick={()=>{sendAnswer('D')}}></div>
            </div>
        </>
    )
}
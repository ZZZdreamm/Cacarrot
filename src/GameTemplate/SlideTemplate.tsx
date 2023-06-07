import { useEffect, useState } from "react";
import { Question } from "./questions.models";
import { removeItemFromState } from "../Utilities/StateModifications";
import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function SlideTemplate({slideNumber, questions, setQuestions,choosenQuestion, setChoosenQuestion, removeSlide}){
    useEffect(()=>{
        questions[slideNumber-1].questionNumber = slideNumber
    },[slideNumber])
    const colorSlide = slideNumber === choosenQuestion ? {background: '#b64926'} : {}
    return(
        <div className="slide" style={colorSlide}>
            <div style={{position:'relative', left:'25%'}}>{slideNumber}</div>
            <img className="small-image" src={`${ReadyImagesURL}/bin-image.png`} alt="Bin" onClick={()=>{
                removeSlide()
            }}/>
            <img className="slide-image" src={`${ReadyImagesURL}/question-image.png`} alt="Slide" onClick={()=>{setChoosenQuestion(slideNumber)}}/>
        </div>
    )
}

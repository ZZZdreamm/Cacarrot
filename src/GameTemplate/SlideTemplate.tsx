import { useEffect, useState } from "react";
import { Question } from "./questions.models";
import { removeItemFromState } from "../Utilities/StateModifications";
import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function SlideTemplate({slideNumber, questions, setQuestions,choosenQuestion, setChoosenQuestion, removeSlide}){

    const colorSlide = slideNumber === choosenQuestion ? {background: '#7c73e6'} : {}
    return(
        <div className="slide" style={colorSlide}
        // onClick={()=>{setChoosenQuestion(slideNumber)}}
        >

            <div style={{position:'relative', left:'25%'}}>{slideNumber}</div>
            <img className="small-image" src={`${ReadyImagesURL}/bin-image.png`} alt="Bin" onClick={()=>{
                removeSlide()
            }}/>
            <img className="slide-image" src={`${ReadyImagesURL}/question-image.png`} alt="Slide" onClick={()=>{setChoosenQuestion(slideNumber)}}/>
        </div>
    )
}

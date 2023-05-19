import { Question } from "../Questions/questions.models";
import { removeItemFromState } from "../Utilities/StateModifications";
import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function SlideTemplate({slideNumber, setQuestions,choosenQuestion, setChoosenQuestion}){
    function adjustQuestionsNumbers(){
        setQuestions((questions:Question[]) =>{
            const newQuestions = questions.map((question:Question) => {
                if(question.questionNumber > slideNumber){
                    question.questionNumber -= 1
                }
                return question
            })
            return newQuestions
        })
    }
    const colorSlide = slideNumber == choosenQuestion ? {background: '#7c73e6'} : {}
    return(
        <div className="slide" style={colorSlide} onClick={()=>{setChoosenQuestion(slideNumber)}}>
            <div style={{position:'relative', left:'25%'}}>{slideNumber}</div>
            <img className="small-image" src={`${ReadyImagesURL}/bin-image.png`} onClick={()=>{
                adjustQuestionsNumbers()
                removeItemFromState(slideNumber, setQuestions)
            }}/>
            <img className="slide-image" src={`${ReadyImagesURL}/question-image.png`}/>
        </div>
    )
}

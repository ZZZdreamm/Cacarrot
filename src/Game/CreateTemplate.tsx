import { useEffect, useState } from "react";
import { Question } from "../Questions/questions.models";
import SlideTemplate from "./SlideTemplate";
import { addItemToState } from "../Utilities/StateModifications";
import { ReadyImagesURL } from "../appUrls";
import QuestionTemplate from "../Questions/QuestionTemplate";

export default function CreateTemplate() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionNumber: 1,
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "",
    },
    {
      questionNumber: 2,
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "",
    },
  ]);
  const [choosenQuestion, setChoosenQuestion] = useState(1);

  const timesForAnswer = [5, 10, 20, 30, 40]

  function saveTemplate(){
    
  }
  return (
    <main className="wrapper" style={{ display: "flex" }}>
      <div className="bar question-bar">
        {questions.map((question) => (
          <SlideTemplate
            key={question.questionNumber}
            slideNumber={question.questionNumber}
            setQuestions={setQuestions}
            choosenQuestion={choosenQuestion}
            setChoosenQuestion={setChoosenQuestion}
          ></SlideTemplate>
        ))}
        <button
          onClick={() => {
            addItemToState(
              {
                questionNumber: questions.length + 1,
                question: "",
                answerA: "",
                answerB: "",
                answerC: "",
                answerD: "",
                correctAnswer: "",
              },
              setQuestions
            );
          }}
        >
          Add question
        </button>
      </div>
      <QuestionTemplate question={questions[choosenQuestion - 1]} questionNumber={choosenQuestion} setQuestions={setQuestions}/>
      <div className="bar right-bar">
        <button onClick={()=>{
          saveTemplate()
        }}>Save template</button>
        <label>Time for answer</label>
        <select>
          {timesForAnswer.map((time)=>(
            <option value={time}>{time} sec</option>
          ))}
        </select>
      </div>
    </main>
  );
}

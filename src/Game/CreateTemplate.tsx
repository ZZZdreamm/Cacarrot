import { useState } from "react";
import { Question } from "../Questions/questions.models";
import SlideTemplate from "./SlideTemplate";
import { addItemToState } from "../Utilities/StateModifications";
import QuestionTemplate from "../Questions/QuestionTemplate";
import { saveTemplateInDB } from "../FirebaseDatabase/FirebaseConfig";
import { GameTemplate } from "./game.models";
import MyModal from "../Utilities/Modal";
import MyInput from "../Utilities/MyInput";
import { useNavigate } from "react-router-dom";

export default function CreateTemplate() {
  const navigate = useNavigate();
  let uuidv4 = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e: any) {
    setIsOpen(!isOpen);
  }
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

  const [questionTime, setQuestionTime] = useState(10);
  const [templateName, setTemplateName] = useState("");

  const timesForAnswer = [5, 10, 20, 30, 40];

  function saveTemplate() {
    const userId = localStorage.getItem("id");
    let validQuestions : Question[] = []
    questions.forEach(question => {
      if(validateQuestion(question)){
        validQuestions.push(question)
      }
    });
    const gameTemplate: GameTemplate = {
      id: uuidv4(),
      templateName: templateName,
      allQuestions: validQuestions,
      questionTime: questionTime,
    };
    saveTemplateInDB(userId!, gameTemplate);
    navigate("/create");
  }


  function validateQuestion(question:Question){
    if(question.answerA && question.answerB && question.answerC && question.answerD && question.question && question.correctAnswer){
      return true
    }
    return false
  }
  return (
    <main style={{ display: "flex", width: "100%", height: "100%" }}>
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
      <QuestionTemplate
        question={questions[choosenQuestion - 1]}
        questionNumber={choosenQuestion}
        setQuestions={setQuestions}
      />
      <div className="bar right-bar">
        <button onClick={toggleModal}>Save template</button>
        <MyModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          children={
            <>
              {/* <input className="my-input" style={{margin:'1rem', fontSize:'1.5rem'}} value={templateName} onChange={(event)=>{
                  setTemplateName(event.target.value)
                }}/> */}
              <h2>Template name</h2>
              <MyInput
                value={templateName}
                setValue={setTemplateName}
                placeholder={"Enter template name"}
                characterLimit={20} visibleWarning={true}              />
            </>
          }
          submitButtonText={"Save template"}
          onSubmit={() => {
            saveTemplate();
          }}
        />
        <label>Time for answer</label>
        <select
          onChange={(event) => {
            setQuestionTime(parseInt(event.target.value));
          }}
        >
          {timesForAnswer.map((time) => (
            <option value={time}>{time} sec</option>
          ))}
        </select>
      </div>
    </main>
  );
}
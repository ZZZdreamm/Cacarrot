import { useState } from "react";
import QuestionTemplate from "../Questions/QuestionTemplate";
import MyModal from "../Utilities/Modal";
import MyInput from "../Utilities/MyInput";
import { Question } from "../Questions/questions.models";
import { GameTemplate } from "./game.models";
import { saveTemplateInDB } from "../FirebaseDatabase/FirebaseConfig";
import { useLocation, useNavigate } from "react-router-dom";
import SlideTemplate from "./SlideTemplate";
import { addItemToState } from "../Utilities/StateModifications";

export default function EditTemplate() {

    const location = useLocation()
    const gameTemplate = location.state
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(e: any) {
    setIsOpen(!isOpen);
  }
  const [questions, setQuestions] = useState<Question[]>(gameTemplate.allQuestions);
  const [choosenQuestion, setChoosenQuestion] = useState(1);

  const [questionTime, setQuestionTime] = useState(gameTemplate.questionTime);
  const [templateName, setTemplateName] = useState(gameTemplate.templateName);

  const timesForAnswer = [5, 10, 20, 30, 40];

  function saveTemplate() {
    const userId = localStorage.getItem("id");
    let validQuestions: Question[] = [];
    questions.forEach((question) => {
      if (validateQuestion(question)) {
        validQuestions.push(question);
      }
    });
    const newGameTemplate: GameTemplate = {
      id: gameTemplate.id,
      templateName: templateName,
      allQuestions: validQuestions,
      questionTime: questionTime,
    };
    saveTemplateInDB(userId!, newGameTemplate);
    navigate("/create");
  }

  function validateQuestion(question: Question) {
    if (
      question.answerA &&
      question.answerB &&
      question.answerC &&
      question.answerD &&
      question.question &&
      question.correctAnswer
    ) {
      return true;
    }
    return false;
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
                characterLimit={20}
                visibleWarning={true}
              />
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

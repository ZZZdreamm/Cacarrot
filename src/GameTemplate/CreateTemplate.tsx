import { useEffect, useState } from "react";
import { Question } from "./questions.models";
import QuestionTemplate from "./QuestionTemplate";
import MyModal from "../Utilities/Modal";
import MyInput from "../Utilities/MyInput";
import { useNavigate } from "react-router-dom";
import { removeItemFromState } from "../Utilities/StateModifications";
import TemplateRightBar from "./TemplateRightBar";
import TemplateLeftBar from "./TemplateLeftBar";
import { saveTemplate } from "./TemplateFunctions";

export default function CreateTemplate() {
  const navigate = useNavigate();

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
  const [error, setError] = useState("");

  const timesForAnswer = [5, 10, 20, 30, 40];

  function submitTemplate(){
    const saved = saveTemplate(questions, templateName, questionTime);
    if(saved){
      navigate('/create')
    }else{
      setError("You have to have at least 1 full question!");
    }
  }

  const deleteQuestion = async (slideNumber: number) => {
    if (
      (slideNumber >= questions.length || slideNumber < choosenQuestion) &&
      choosenQuestion > 1
    ) {
      setChoosenQuestion(choosenQuestion - 1);
    } else {
      setChoosenQuestion(1);
    }
    removeItemFromState(slideNumber, setQuestions);
  };

  useEffect(()=>{
    console.log(questions)
  },[questions])

  return (
    <main className="question-placeholder">
      <TemplateLeftBar
        questions={questions}
        setQuestions={setQuestions}
        choosenQuestion={choosenQuestion}
        setChoosenQuestion={setChoosenQuestion}
        deleteQuestion={deleteQuestion}
      />
      <QuestionTemplate
        question={questions[choosenQuestion - 1]}
        questionNumber={choosenQuestion}
        setQuestions={setQuestions}
      />
      <TemplateRightBar
        toggleModal={toggleModal}
        questionTime={questionTime}
        setQuestionTime={setQuestionTime}
        timesForAnswer={timesForAnswer}
      />
      <MyModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        children={
          <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
            <h2>Template name</h2>
            <MyInput
              value={templateName}
              setValue={setTemplateName}
              placeholder={"Enter template name"}
              characterLimit={20}
              visibleWarning={true}
            />
            {error && <span className="error">{error}</span>}
          </div>
        }
        submitButtonText={"Save template"}
        onSubmit={submitTemplate}
      />
    </main>
  );
}

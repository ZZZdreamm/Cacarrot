import { addItemToState } from "../Utilities/StateModifications";
import SlideTemplate from "./SlideTemplate";
import { Question } from "./questions.models";

export default function TemplateLeftBar({
  questions,
  setQuestions,
  choosenQuestion,
  setChoosenQuestion,
  deleteQuestion,
}: TemplateLeftBarProps) {
  
  return (
    <div className="bar question-bar">
      {questions &&
        questions.map((question, index) => (
          <SlideTemplate
            key={question.questionNumber}
            slideNumber={index + 1}
            questions={questions}
            setQuestions={setQuestions}
            choosenQuestion={choosenQuestion}
            setChoosenQuestion={setChoosenQuestion}
            removeSlide={() => {
              deleteQuestion(index + 1);
            }}
          />
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
  );
}

interface TemplateLeftBarProps {
  questions: Question[];
  setQuestions: (e: any) => void;
  choosenQuestion: number;
  setChoosenQuestion: (e: any) => void;
  deleteQuestion: (slideNumber: number) => void;
}

import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Question } from "./questions.models";
import Answer from "./Answer";

//@ts-ignore
export default function QuestionTemplate({
  question,
  questionNumber,
  setQuestions,
}: QuestionData) {
  const questionRef = useRef(null);
  const answerARef = useRef(null);
  const answerBRef = useRef(null);
  const answerCRef = useRef(null);
  const answerDRef = useRef(null);

  const [checkboxes, setCheckboxes] = useState([
    { id: 0, checked: false },
    { id: 1, checked: false },
    { id: 2, checked: false },
    { id: 3, checked: false },
  ]);

  const characterLimit = 70;
  const questionCharacterLimit = 40;

  useEffect(() => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (
        (checkbox.id === 0 && question.correctAnswer === "A") ||
        (checkbox.id === 1 && question.correctAnswer === "B") ||
        (checkbox.id === 2 && question.correctAnswer === "C") ||
        (checkbox.id === 3 && question.correctAnswer === "D")
      ) {
        return { ...checkbox, checked: true };
      }
      return { ...checkbox, checked: false };
    });
    setCheckboxes(updatedCheckboxes);
  }, [questionNumber]);

  function onQuestionChange(whatChanged: any, changedValue: string) {
    setQuestions((prevQuestions: Question[]) => {
      prevQuestions.forEach((question) => {
        if (question.questionNumber === questionNumber) {
          if (whatChanged === "question") {
            question.question = changedValue;
          } else if (whatChanged === "answerA") {
            question.answerA = changedValue;
          } else if (whatChanged === "answerB") {
            question.answerB = changedValue;
          } else if (whatChanged === "answerC") {
            question.answerC = changedValue;
          } else if (whatChanged === "answerD") {
            question.answerD = changedValue;
          } else if (whatChanged === "correctAnswer") {
            question.correctAnswer = changedValue;
          }
        }
        return question;
      });
      return prevQuestions;
    });
  }
  const handleInput = (divRef: any, characterLimit: number) => {
    const content = divRef.current.innerText;
    if (content.length > characterLimit) {
      console.log(divRef.current.innerText);
      divRef.current.innerText = content.slice(0, characterLimit);
    }
  };

  function handleCheckboxChange(checkboxNumber: number) {
    console.log(checkboxNumber);
    if (checkboxes[checkboxNumber].checked) {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === checkboxNumber) {
          return { ...checkbox, checked: false };
        }
        return { ...checkbox };
      });
      console.log(updatedCheckboxes);
      setCheckboxes(updatedCheckboxes);
    } else {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === checkboxNumber) {
          return { ...checkbox, checked: true };
        }
        return { ...checkbox, checked: false };
      });
      console.log(updatedCheckboxes);
      setCheckboxes(updatedCheckboxes);
    }
  }

  const answers = [
    {
      answerSign: "A",
      answerRef: answerARef,
      answer: question.answerA,
      checkboxNumber: 0,
    },
    {
      answerSign: "B",
      answerRef: answerBRef,
      answer: question.answerB,
      checkboxNumber: 1,
    },
    {
      answerSign: "C",
      answerRef: answerCRef,
      answer: question.answerC,
      checkboxNumber: 2,
    },
    {
      answerSign: "D",
      answerRef: answerDRef,
      answer: question.answerD,
      checkboxNumber: 3,
    },
  ];
  return (
    <section className="question-template">
      <div
        ref={questionRef}
        className="my-input question-input"
        placeholder="Write your question here"
        contentEditable={true}
        onInput={() => {
          handleInput(questionRef, questionCharacterLimit);
          //@ts-ignore
          onQuestionChange("question", questionRef.current!.innerText);
        }}
      >
        {question.question}
      </div>
      <img
        className="question-image"
        src={`${ReadyImagesURL}/landscape-image.jpg`}
        alt="Beautiful"
      />
      <div className="answers-placeholder">
        {answers.map((answer) => (
          <Answer
            answerSign={answer.answerSign}
            answerRef={answer.answerRef}
            answer={answer.answer}
            checkboxNumber={answer.checkboxNumber}
            characterLimit={characterLimit}
            handleInput={handleInput}
            onQuestionChange={onQuestionChange}
            checkboxes={checkboxes}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    </section>
  );
}

interface QuestionData {
  question: Question;
  questionNumber: number;
  setQuestions: any;
}

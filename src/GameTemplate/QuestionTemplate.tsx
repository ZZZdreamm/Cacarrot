import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Question } from "./questions.models";

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
      // console.log(prevQuestions);
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
    if (checkboxes[checkboxNumber].checked) {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === checkboxNumber) {
          return { ...checkbox, checked: false };
        }
        return { ...checkbox };
      });
      setCheckboxes(updatedCheckboxes);
    } else {
      const updatedCheckboxes = checkboxes.map((checkbox) => {
        if (checkbox.id === checkboxNumber) {
          return { ...checkbox, checked: true };
        }
        return { ...checkbox, checked: false };
      });
      setCheckboxes(updatedCheckboxes);
    }
  }

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
        <span id="answer-A" className="answer">
          <div
            ref={answerARef}
            className="my-input editable-div"
            contentEditable={true}
            onInput={() => {
              handleInput(answerARef, characterLimit);
              //@ts-ignore
              onQuestionChange("answerA", answerARef.current!.innerText);
            }}
          >
            {question.answerA}
          </div>
          <input
            checked={checkboxes[0].checked}
            className="answer-checkbox"
            type="checkbox"
            onChange={(e) => {
              handleCheckboxChange(0);
              onQuestionChange("correctAnswer", "A");
            }}
          />
        </span>
        <span id="answer-B" className="answer">
          <div
            ref={answerBRef}
            className="my-input editable-div"
            contentEditable={true}
            onInput={() => {
              handleInput(answerBRef, characterLimit);
              //@ts-ignore
              onQuestionChange("answerB", answerBRef.current!.innerText);
            }}
          >
            {question.answerB}
          </div>
          <input
            checked={checkboxes[1].checked}
            className="answer-checkbox"
            type="checkbox"
            onChange={() => {
              handleCheckboxChange(1);
              onQuestionChange("correctAnswer", "B");
            }}
          />
        </span>
        <span id="answer-C" className="answer">
          <div
            ref={answerCRef}
            className="my-input editable-div"
            contentEditable={true}
            onInput={() => {
              handleInput(answerCRef, characterLimit);
              //@ts-ignore
              onQuestionChange("answerC", answerCRef.current!.innerText);
            }}
          >
            {question.answerC}
          </div>
          <input
            checked={checkboxes[2].checked}
            className="answer-checkbox"
            type="checkbox"
            onChange={() => {
              handleCheckboxChange(2);
              onQuestionChange("correctAnswer", "C");
            }}
          />
        </span>
        <span id="answer-D" className="answer">
          <div
            ref={answerDRef}
            className="my-input editable-div"
            contentEditable={true}
            onInput={() => {
              handleInput(answerDRef, characterLimit);
              //@ts-ignore
              onQuestionChange("answerD", answerDRef.current!.innerText);
            }}
          >
            {question.answerD}
          </div>
          <input
            checked={checkboxes[3].checked}
            className="answer-checkbox"
            type="checkbox"
            onChange={() => {
              handleCheckboxChange(3);
              onQuestionChange("correctAnswer", "D");
            }}
          />
        </span>
      </div>
    </section>
  );
}

interface QuestionData {
  question: Question;
  questionNumber: number;
  setQuestions: any;
}

import { useEffect, useRef, useState } from "react";
import Timer from "../Utilities/Timer";
import { ReadyImagesURL } from "../appUrls";
import { start } from "repl";
import StartingTimer from "./StartingTimer";
import { fetchData, setDataInDB } from "../FirebaseDatabase/GamesInDB";
import { Question } from "../GameTemplate/questions.models";

//@ts-ignore
export default function ShownQuestion({
  currentQuestion,
  time,
  setTime,
  gamecode,
}: ShownQuestionProps) {
  const [startingTime, setStartingTime] = useState<number>();
  const [showQuestion, setShowQuestion] = useState(false);
  const [rotation, setRotation] = useState({});
  useEffect(() => {
    fetchData(gamecode, 3, setStartingTime, "startingTime")
  }, []);

  useEffect(()=>{
    console.log(startingTime)

  },[startingTime])

  useEffect(() => {
    if (startingTime) {
      onTimeChange(3 - startingTime);
      setDataInDB(gamecode, startingTime, "startingTime");
      if (startingTime < 1) {
        setTimeout(() => {
          setShowQuestion(true);
        }, 1000);
      }
    }
    if (startingTime == 0){
      setDataInDB(gamecode, startingTime, "startingTime");
      setShowQuestion(true);
    }
  }, [startingTime]);
  function onTimeChange(rotationNumber: number) {
    setRotation({ transform: `rotate(${rotationNumber * 90}deg)` });
  }
  return (
    <>
      {!showQuestion && (
        <div className="circle" style={{ position: "absolute", top: "45%" }}>
          <div className="rolling-square" style={rotation}></div>
          <StartingTimer time={startingTime} setTime={setStartingTime} />
        </div>
      )}
      {showQuestion && (
        <>
          <Timer time={time} setTime={setTime} bonusStyling={{ left: "90%" }} />

          <div className="my-input shown-question">
            {currentQuestion.question}
          </div>
          <img
            className="question-image"
            src={`${ReadyImagesURL}/landscape-image.jpg`}
            style={{ width: "40%" }}
          />
          <div
            className="answers-placeholder"
            style={{ width: "80%", marginBottom: "2em" }}
          >
            <span id="answer-A" className="answer">
              {currentQuestion.answerA}
            </span>
            <span id="answer-B" className="answer">
              {currentQuestion.answerB}
            </span>
            <span id="answer-C" className="answer">
              {currentQuestion.answerC}
            </span>
            <span id="answer-D" className="answer">
              {currentQuestion.answerD}
            </span>
          </div>
        </>
      )}
    </>
  );
}

interface ShownQuestionProps {
  currentQuestion: Question;
  time: number;
  setTime: (time: number) => void;
  gamecode: string;
}

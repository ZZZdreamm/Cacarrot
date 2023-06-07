import { useEffect, useRef, useState } from "react";
import Timer from "../Utilities/Timer";
import { ReadyImagesURL } from "../appUrls";
import { start } from "repl";
import { fetchData, setDataInDB } from "../FirebaseDatabase/GamesInDB";
import { Question } from "../GameTemplate/questions.models";
import { Game } from "./game.models";

//@ts-ignore
export default function ShownQuestion({
  currentQuestion,
  time,
  gamecode,
  game,
  setGame
}: ShownQuestionProps) {
  const [showQuestion, setShowQuestion] = useState(false);
  useEffect(() => {
    fetchData(gamecode, 3, setGame, "startingTime");
  }, []);


  useEffect(() => {
    if (game.startingTime == 0) {
      setShowQuestion(true);
    }
  }, [game.startingTime]);
  return (
    <>
      {!showQuestion && (
        <>
          <div style={{ position: "absolute", top: "45%" }}>
            <div className="my-input shown-question">
              {currentQuestion.question}
            </div>
            <Timer
              time={game.startingTime}
              bonusStyling={{ display: "none" }}
            />
          </div>
        </>
      )}
      {showQuestion && (
        <>
          <Timer time={time} bonusStyling={{ left: "90%" }} />

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
  gamecode: string;
  game:Game;
  setGame:(game:Game) => void
}

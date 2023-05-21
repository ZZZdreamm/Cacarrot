import Timer from "../Utilities/Timer";
import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function ShownQuestion({currentQuestion, time, setTime }) {
  return (
    <>
      <Timer time={time} setTime={setTime} />

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
  );
}

import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function QuestionTemplate({question, questionNumber, setQuestions}) {
  return (
    <section className="question-template">
      <div
        className="my-input question-input"
        placeholder="Write your question here"
        contentEditable={true}
      >{question.question}</div>
      <img
        className="question-image"
        src={`${ReadyImagesURL}/landscape-image.jpg`}
      />
      <div className="answers-placeholder">
        <span id="answer-A" className="answer">
          <div className="my-input"  contentEditable={true}>{question.answerA}</div>
          <input className="answer-checkbox" type="checkbox" />
        </span>
        <span id="answer-B" className="answer">
          <div className="my-input"  contentEditable={true}>{question.answerB}</div>
          <input className="answer-checkbox" type="checkbox" />
        </span>
        <span id="answer-C" className="answer">
          <div className="my-input"  contentEditable={true}>{question.answerC}</div>
          <input className="answer-checkbox" type="checkbox" />
        </span>
        <span id="answer-D" className="answer">
          <div className="my-input" contentEditable={true}>{question.answerD}</div>
          <input className="answer-checkbox" type="checkbox" />
        </span>
      </div>
    </section>
  );
}

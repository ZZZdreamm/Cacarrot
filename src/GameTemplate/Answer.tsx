export default function Answer({answerSign, answerRef, characterLimit, handleInput, onQuestionChange, answer, checkboxNumber, checkboxes, handleCheckboxChange}:AnswerProps){
    return(
    <span id={`answer-${answerSign}`} className="answer">
          <div
            ref={answerRef}
            className="my-input editable-div"
            contentEditable={true}
            onInput={() => {
              handleInput(answerRef.current, characterLimit);
              //@ts-ignore
              onQuestionChange(`answer${answerSign}`, answerRef.current!.innerText);
            }}
          >
            {answer}
          </div>

          <input
            checked={checkboxes[checkboxNumber].checked}
            className="answer-checkbox"
            type="checkbox"
            onChange={(e) => {
              handleCheckboxChange(checkboxNumber);
              onQuestionChange("correctAnswer", answerSign);
            }}
          />
        </span>
    )
}

interface AnswerProps{
    answerSign:string;
    answerRef:any;
    characterLimit:number;
    handleInput:(answerSign:any, answer:any)=> void;
    onQuestionChange:(e:any, answerSign:any)=>void;
    answer:string;
    checkboxNumber:number;
    checkboxes:any;
    handleCheckboxChange:(e:any)=>void;
}

export default function TemplateRightBar({toggleModal, questionTime, setQuestionTime, timesForAnswer}:TemplateRightBarProps){
    return(
        <div className="bar right-bar">
        <button onClick={toggleModal}>Save template</button>

        <label>Time for answer</label>
        <select
          value={questionTime}
          onChange={(event) => {
            setQuestionTime(parseInt(event.target.value));
          }}
        >
          {timesForAnswer.map((time:number) => (
            <option key={time} value={time}>
              {time} sec
            </option>
          ))}
        </select>
      </div>
    )
}

interface TemplateRightBarProps{
  toggleModal:(e:any)=>void;
  questionTime:number;
  setQuestionTime:(e:any)=>void;
  timesForAnswer:number[];
}
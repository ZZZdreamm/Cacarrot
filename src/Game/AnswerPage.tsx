import { useEffect, useState } from "react";
import {
  checkIfAnswerSended,
  fetchData,
  getOnStartingTime,
  sendAnswerToDB,
} from "../FirebaseDatabase/GamesInDB";
import Timer from "../Utilities/Timer";
import { Answer } from "./game.models";
import StartingTimer from "./StartingTimer";

//@ts-ignore
export default function AnswerPage({
  gameState,
  time,
  setShownComponent,
  username,
  setPointsForLast,
  setLastAnswer
}: AnswerPageProps) {
  const [answerSended, setAnswerSended] = useState(false);
  const [startingTime, setStartingTime] = useState<number>(3)
  const [rotation, setRotation] = useState({});

  useEffect(()=>{
    getOnStartingTime(gameState.gamecode, setStartingTime)
  },[])

  const sendAnswer = (answer: string) => {
    return async () => {
      const sendingTime = gameState.gameTemplate.questionTime - time;
      await sendAnswerToDB(
        gameState.gamecode,
        username,
        answer,
        gameState.currentQuestion,
        sendingTime
      );
      setAnswerSended(true);
      const yourAnswer = {
        choosenAnswer: answer,
        sendingTime: sendingTime,
        questionNumber: gameState.currentQuestion,
      };
      setLastAnswer(yourAnswer);
      setPointsForLast(yourAnswer);
      setShownComponent("between");
    };
  };

  useEffect(() => {
    if (time < 1) {
      checkIfAnswerSended(gameState.gamecode, username, setAnswerSended);
    }
  }, [time]);

  useEffect(() => {
    console.log(answerSended)
    if (!answerSended) {
      sendAnswer("");
    }
  }, [answerSended]);



  useEffect(() => {
    if(startingTime || startingTime == 0){
        onTimeChange(3 - startingTime);
    }
  }, [startingTime]);
  function onTimeChange(rotationNumber: number) {
    setRotation({ transform: `rotate(${rotationNumber * 90}deg)` });
  }

  return (
    <>
      {startingTime > 0 && (
        <div className="circle" style={{ position: "absolute", top: "45%" }}>
          <div className="rolling-square" style={rotation}></div>
          <StartingTimer
            time={startingTime}
            setTime={()=>{}}
            bonusStyling={{marginTop:'0', position:'absolute'}}
          />
        </div>
      )}
      {startingTime == 0 && (
        <>
          <Timer time={time} setTime={() => {}} bonusStyling={{ top: "0%" }} />
          <div className="grid-container">
            <div id="answer-A" onClick={sendAnswer("A")}></div>
            <div id="answer-B" onClick={sendAnswer("B")}></div>
            <div id="answer-C" onClick={sendAnswer("C")}></div>
            <div id="answer-D" onClick={sendAnswer("D")}></div>
          </div>
        </>
      )}
    </>
  );
}

interface AnswerPageProps {
  gameState: any;
  time: number;
  setShownComponent: (shownComponent: string) => void;
  username: string;
  setPointsForLast: (e: any) => void;
  setLastAnswer: (answer: Answer) => void;
}

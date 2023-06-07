import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Answer, Player } from "./game.models";
import ChooseAbility from "./ChooseAbility";
import Waiting from "../Utilities/Waiting";

//@ts-ignore
export default function BetweenQuestions({
  gameState,
  lastQuestionPoints,
}: BetweenQuestionsProps) {
  const [componentState, setComponentState] = useState("showingAnswer");



  useEffect(() => {
    // if (
    //   gameState.gamePhase % 2 == 0 &&
    //   gameState.gamePhase < gameState.gameTemplate.allQuestions.length * 2 - 1
    // ) {
    //   setComponentState("choosingAbility");
    // } else {
      setComponentState("showingAnswer");
    // }
  }, [gameState.gamePhase]);

  const answerEffectImage =
    lastQuestionPoints != 0 ? `good-answer.png` : `wrong-answer.png`;
  const answerText = lastQuestionPoints != 0 ? `Good answer!` : `Wrong answer!`;
  return (
    <>
      {componentState == "showingAnswer" && (
        <>
          <div className="answer-result-container" style={{position:'relative', top:'20%'}}>
            <img
              className="circle-image"
              src={`${ReadyImagesURL}/${answerEffectImage}`}
              alt="Answer"
              style={{ width: "50%", aspectRatio: 1 }}
            />
            <h2>{answerText}</h2>
            <h4>+ {lastQuestionPoints} points</h4>
          </div>
        </>
      )}
      {/* {componentState == "choosingAbility" && (
        <ChooseAbility
          gameState={gameState}
          player={player}
          setPoints={setPoints}
          setActiveEffects={setActiveEffects}
          points={points}
          setComponentState={setComponentState}
        />
      )} */}
      {componentState == "waitingForOthers" && (
        <Waiting message="Wait for other players" setTime={()=>{}} />
      )}
    </>
  );
}

interface BetweenQuestionsProps {
  gameState: any;
  lastQuestionPoints: number;
}

import { useEffect, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import {
  fetchData,
  getCurrentQuestionFromDB,
  getGameStart,
  setPointsForPlayer,
} from "../FirebaseDatabase/GamesInDB";
import { Answer, Player } from "./game.models";
import ChooseAbility from "./ChooseAbility";
import Waiting from "../Utilities/Waiting";

//@ts-ignore
export default function BetweenQuestions({
  gameState,
  setShownComponent,
  questionDone,
  setQuestionsDone,
  setTime,
  lastQuestionPoints,
  setLastQuestionPoints,
  player,
  points,
  setPoints,
  setActiveEffects,
}: BetweenQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [componentState, setComponentState] = useState("showingAnswer");

  useEffect(() => {
    fetchData(
      gameState.gamecode,
      questionDone,
      setQuestionsDone,
      "questionDone"
    );
    getCurrentQuestionFromDB(gameState.gamecode, setCurrentQuestion);
  }, []);

  useEffect(() => {
    if (currentQuestion > questionDone) {
      console.log("alo");
      setTime(gameState.gameTemplate.questionTime);
      setLastQuestionPoints(0);
      setShownComponent("answers");
    }
  }, [currentQuestion]);

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
          <div className="answer-result-container">
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
        <Waiting message="Wait for other players" />
      )}
    </>
  );
}

interface BetweenQuestionsProps {
  gameState: any;
  setShownComponent: (shownComponent: string) => void;
  questionDone: number;
  setQuestionsDone: (questionDone: number) => void;
  setTime: (time: number) => void;
  lastQuestionPoints: number;
  setLastQuestionPoints: (points: number) => void;
  player: Player;
  points: number;
  setPoints: (points: number) => void;
  setActiveEffects: (effects: string[]) => void;
}

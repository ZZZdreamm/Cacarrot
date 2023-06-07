import { useEffect, useState } from "react";
import { getOnStartingTime } from "../FirebaseDatabase/GamesInDB";
import Timer from "../Utilities/Timer";
import { socket } from "../App";
import { Answer, Game, Player } from "./game.models";

export default function AnswerPage({
  gameState,
  setGame,
  setShownComponent,
  player,
}: AnswerPageProps) {
  const [rotation, setRotation] = useState({});

  useEffect(() => {
    getOnStartingTime(gameState.gamecode, setGame);
  }, []);

  const sendAnswer = (answer: string) => {
    return async () => {
      const sendingTime = gameState.gameTemplate.questionTime - gameState.time;
      const yourAnswer: Answer = {
        choosenAnswer: answer,
        sendingTime: sendingTime,
        questionNumber: gameState.currentQuestion,
        pointsFor: 0,
      };
      socket.emit("send-answer", {
        playerName: player.name,
        answer: yourAnswer,
        bonuses: player.activeBonuses,
      });
      setTimeout(() => {
        setShownComponent("between");
      }, 350);
    };
  };

  useEffect(() => {
    if (gameState.startingTime || gameState.startingTime == 0) {
      onTimeChange(3 - gameState.startingTime);
    }
  }, [gameState.startingTime]);

  function onTimeChange(rotationNumber: number) {
    setRotation({ transform: `rotate(${rotationNumber * 90}deg)` });
  }

  return (
    <>
      {gameState.startingTime > 0 && (
        <div className="circle" style={{ position: "absolute", top: "45%" }}>
          <div className="rolling-square" style={rotation}></div>
          <Timer
            time={gameState.startingTime}
            bonusStyling={{ marginTop: "0", position: "absolute" }}
          />
        </div>
      )}
      {gameState.startingTime == 0 && (
        <>
          <Timer time={gameState.time} bonusStyling={{ top: "0%" }} />
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
  gameState: Game;
  setGame: (game: Game) => void;
  setShownComponent: (shownComponent: string) => void;
  player: Player;
}

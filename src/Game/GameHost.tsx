import { useEffect, useState } from "react";
import { useFetcher, useLocation } from "react-router-dom";
import { Game, Player } from "./game.models";
import { Question } from "../GameTemplate/questions.models";
import ShownQuestion from "./ShownQuestion";
import Statistics from "./Statistics";
import Winners from "./Winners";
import {
  getGameData,
  fetchData,
} from "../FirebaseDatabase/GamesInDB";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import { getSortedPlayers, getWinners } from "./FunctionsGame";
import { HostConnection } from "../FirebaseDatabase/ConnectedToDB";
import Waiting from "../Utilities/Waiting";
import { socket } from "../App";

export default function GameHost() {
  const location = useLocation();
  const { state } = location;
  const gameData: Game = state.gamestate;
  const [game, setGame] = useState(gameData);
  const gamecode = gameData.gamecode;
  const [shownComponent, setShownComponent] = useState("question");
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    game.gameTemplate.allQuestions[0]
  );
  const [players, setPlayers] = useState(game.players);
  const [showPage, setShowPage] = useState(false);


  useEffect(() => {
    socket.emit("host-reconnect", { code: gamecode, hostId: socket.id });
    HostConnection(gamecode)
    getGameData(gamecode, setGame);
  }, []);

  useEffect(() => {
    if (gamecode) {
      const getData = async () => {
        await fetchData(gamecode, game.time, setGame, "time");
        await fetchData(gamecode, game.hostConnection, setGame, "hostConnection");
        await fetchData(gamecode, game.winners, setGame, "winners");
        await fetchData(gamecode, game.gamePhase, setGame, "gamePhase");
        await fetchData(gamecode, game.currentQuestion, setGame, "currentQuestion");
        setShowPage(true)
      };
      getData();
    }
  }, [gamecode]);

  useEffect(() => {
    if (game.gamePhase) {
      if (game.gamePhase == game.gameTemplate.allQuestions.length * 2 + 1) {
        setShownComponent("winners");
      } else if (game.gamePhase % 2 == 0) {
        setShownComponent("statistics");
      } else if (game.gamePhase % 2 == 1) {
        setShownComponent("question");
      }
    }
  }, [game.gamePhase]);

  useEffect(() => {
    if (game.currentQuestion) {
      setCurrentQuestion(game.gameTemplate.allQuestions[game.currentQuestion]);
    }
  }, [game.currentQuestion]);

  useEffect(() => {
    getSortedPlayers(game.players, setPlayers);
  }, [game.players]);

  return (
    <>
      <UnloadPrompt />
      {showPage && game.hostConnection ? (
        <div
          className="column-shaped-container"
          style={{
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
          }}
        >
          {shownComponent == "question" && (
            <ShownQuestion
              currentQuestion={currentQuestion}
              time={game.time!}
              gamecode={game.gamecode}
              game={game}
              setGame={setGame}
            />
          )}
          {shownComponent == "statistics" && (
            <Statistics
              time={game.time!}
              players={players}
              setPlayers={setPlayers}
              gamecode={game.gamecode}
            />
          )}
          {shownComponent == "winners" && <Winners winners={game.winners} />}
        </div>
      ) : (
        <Waiting message="Waiting for connection" setTime={() => { } } possibleLeave={true}/>
      )}
    </>
  );
}

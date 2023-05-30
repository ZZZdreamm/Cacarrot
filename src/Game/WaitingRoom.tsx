import { useEffect, useState } from "react";
import { getGameStart } from "../FirebaseDatabase/GamesInDB";
import { useLocation, useNavigate } from "react-router-dom";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import ClearLocalStorage from "../Utilities/ClearLocalStorage";
import { playerLeavesGame } from "./FunctionsGame";
import { gamesRef } from "../FirebaseDatabase/FirebaseConfig";

export default function WaitingRoom() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [gameStart, setGameStart] = useState('waiting');


  const playerRef = gamesRef.child(data.game.gamecode).child('players').child(`${data.playerId}`)
  const disconnectHandler = playerRef.onDisconnect()

  useEffect(() => {
    getGameStart(data.game.gamecode, setGameStart);
    ClearLocalStorage()
    disconnectHandler.remove()
  }, []);


  useEffect(() => {
    if (gameStart == 'started') {
      disconnectHandler.cancel()
      const sendState = { game: data.game, username: data.username, playerNumber: data.playerId+1 };
      localStorage.setItem(`username/${data.playerId+1}`, data.username)
      navigate(`/game-player/${data.game.gamecode}`, { state: sendState });
    }
  }, [gameStart]);

  return (
    <>
      <UnloadPrompt/>
      <div style={{ fontSize: "2em", alignItems:'center', justifyContent:'center', padding:'20px' }}>Wait for start of game...</div>
    </>
  );
}

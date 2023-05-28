import { useEffect, useState } from "react";
import { getGameStart } from "../FirebaseDatabase/GamesInDB";
import { useLocation, useNavigate } from "react-router-dom";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import ClearLocalStorage from "../Utilities/ClearLocalStorage";

export default function WaitingRoom() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const [gameStart, setGameStart] = useState('waiting');
  useEffect(() => {
    getGameStart(data.game.gamecode, setGameStart);
    ClearLocalStorage()
  }, []);

  useEffect(() => {
    if (gameStart == 'started') {
      const playerNumber = data.game.players.length
      const sendState = { game: data.game, username: data.username, playerNumber: playerNumber };
      localStorage.setItem(`username/${playerNumber}`, data.username)
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

import { useEffect, useState } from "react";
import { getGameStart } from "../FirebaseDatabase/GamesInDB";
import { useLocation, useNavigate } from "react-router-dom";
import UnloadPrompt from "../Utilities/UnloadPrompt";
import ClearLocalStorage from "../Utilities/ClearLocalStorage";

export default function WaitingRoom() {
  const location = useLocation();
  //@ts-ignore{
  const data = location.state;
  const navigate = useNavigate();
  const [gameStart, setGameStart] = useState('waiting');
  useEffect(() => {
    getGameStart(data.game.gamecode, setGameStart);
    ClearLocalStorage()
  }, []);

  useEffect(() => {
    if (gameStart == 'started') {
      const sendState = { game: data.game, username: data.username };
      navigate(`/game-player/${data.game.gamecode}`, { state: sendState });
    }
  }, [gameStart]);

  function handleLeaveWebsite(){
    // leaveGame(data.game.gamecode!, data.username);
  };
  return (
    <>
      <UnloadPrompt handleLeaveWebiste={handleLeaveWebsite} />
      <div style={{ fontSize: "2em", alignItems:'center', justifyContent:'center', padding:'20px' }}>Wait for start of game...</div>
    </>
  );
}

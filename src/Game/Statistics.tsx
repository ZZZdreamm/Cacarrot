import { useEffect } from "react";
import Timer from "../Utilities/Timer";
import PlayerStats from "./PlayerStats";
import { Player } from "./game.models";

export default function Statistics({ time, setTime, players, setPlayers }:StatisticsProps) {
  useEffect(()=>{
    setPlayers(players.sort((player1, player2) => player2.points - player1.points))
  },[])
  return (
    <>
      <Timer time={time} setTime={setTime} bonusStyling={{top:'1%'}} />

      <div className="player-stats-list column-shaped-container">
      <p style={{display:'flex', justifyContent:'space-between', width:'80%'}}>
        <span style={{backgroundColor:'#fafafa', borderRadius:'30px', padding:'10px'}}>Name</span>
        <span style={{backgroundColor:'#fafafa', borderRadius:'30px', padding:'10px'}}>Score</span>
      </p>
        {players.map((player: Player) => (
          <PlayerStats key={player.id} player={player} />
        ))}
      </div>
    </>
  );
}

interface StatisticsProps{
  time:Number;
  setTime:(time:number)=>void;
  players:Player[];
  setPlayers:(players:Player[])=>void;
}
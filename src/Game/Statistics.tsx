import { useEffect } from "react";
import Timer from "../Utilities/Timer";
import PlayerStats from "./PlayerStats";
import { Player } from "./game.models";
import { setDataInDB } from "../FirebaseDatabase/GamesInDB";

export default function Statistics({ time, players, setPlayers, gamecode }:StatisticsProps) {
  useEffect(()=>{
    setPlayers(players.sort((player1, player2) => player2.points - player1.points))
  },[])
  useEffect(()=>{
    if(time < 1){
      setDataInDB(gamecode, 3, "startingTime");
    }
  },[time])
  return (
    <>
      <Timer time={time} bonusStyling={{top:'1%'}} />

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
  time:number;
  players:Player[];
  setPlayers:(players:Player[])=>void;
  gamecode:string;
}
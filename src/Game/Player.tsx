import { Player } from "./game.models";

//@ts-ignore
export default function PlayerBar({player, points}) {
  return (
  <div className="navbar" style={{ zIndex: "20", position:'absolute', top:'0' }}>
    <h3 style={{margin:'0 30px'}}>{player.name}</h3>
    <h3 style={{margin:'0 30px'}}>Points: {points}</h3>
  </div>
  )
}

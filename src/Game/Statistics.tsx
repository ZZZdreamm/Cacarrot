import Timer from "../Utilities/Timer";
import PlayerStats from "./PlayerStats";
import { Player } from "./game.models";

//@ts-ignore
export default function Statistics({ time, setTime, players, setPlayers }) {
  return (
    <>
      <Timer time={time} setTime={setTime} />
      <div className="player-stats-list column-shaped-container">
        {players.map((player: Player) => (
          <PlayerStats key={player.id} player={player} />
        ))}
      </div>
    </>
  );
}

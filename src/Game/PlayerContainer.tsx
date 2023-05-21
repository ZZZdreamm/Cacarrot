//@ts-ignore
export default function PlayerContainer({player, image}) {
  return (
    <div className="player-container" key={player.id}>
      <div className="player" style={{backgroundImage:image}}></div>
      <span>{player.name}</span>
    </div>
  );
}

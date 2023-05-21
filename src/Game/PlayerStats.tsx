
//@ts-ignore
export default function PlayerStats({player}){
    return(
        <div className="player-stats">
            <span>{player.name}</span>
            <span>Score: {player.points}</span>
        </div>
    )
}
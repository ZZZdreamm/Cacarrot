import AbilityCard from "./AbilityCard"
import { DoubleNext, PlayerAbilities } from "./PlayerAbilities"
import { Ability, Game, Player } from "./game.models"

export default function ChooseAbility({gameState, player, setPoints, setActiveEffects, points}:ChooseAbilityProps){
    return(
        <>
            <div className="abilities-placeholder">
                {PlayerAbilities.map((ability:Ability, index) => (
                    <AbilityCard key={index} ability={ability} playerPoints={points} onChoose={()=>{ability.onChoose(gameState.gamecode, player.name, setPoints, setActiveEffects, '')}}/>
                ))}
            </div>
            <button style={{marginTop:'2rem'}}>Skip using abilities</button>
        </>
    )
}

interface ChooseAbilityProps{
    gameState:Game;
    player:Player;
    setPoints:any;
    setActiveEffects:any;
    points:number;
}
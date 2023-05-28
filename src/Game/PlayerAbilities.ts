import { gamesRef } from "../FirebaseDatabase/FirebaseConfig"
import { Player } from "./game.models"

export const PlayerAbilities = ["DoubleNext", "TakeEnemy"]

export const DoubleNext = (gamecode:string, playerName:string, setPoints:any, setActiveEffects:any) => {
    setPoints((points:number ) => {
        return points - 500
    })
}
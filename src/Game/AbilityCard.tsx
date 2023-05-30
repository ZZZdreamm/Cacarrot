import { useEffect, useRef } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Ability } from "./game.models";

export default function AbilityCard({ ability, onChoose, playerPoints }: AbilityCardProps) {
    const cardRef = useRef(null)

    useEffect(()=>{
        const ifEnoughPoints = playerPoints > ability.cost ? true : false
        const disabled = ifEnoughPoints ? {} : {}
        if(!ifEnoughPoints){
            console.log('asdasd')
            //@ts-ignore
            const divRef = cardRef.current as HTMLElement
            divRef.onclick = null
        }
    },[playerPoints])
  return (
    <div ref={cardRef}  className="ability-card" style={{}} aria-disabled={true} onClick={()=>{onChoose()}}>
        <div className="ability-card-name">{ability.name}</div>
      <div className="ability-card-image">
        <img src={`${ReadyImagesURL}/${ability.representingImage}`} style={{height:'100%', width:'100%'}} />
      </div>
      <div className="ability-card-text">
        {ability.explanation}
      </div>
    </div>
  );
}

interface AbilityCardProps {
  ability: Ability;
  onChoose:any;
  playerPoints:number;
}

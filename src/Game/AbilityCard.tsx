import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Ability, Game, Player } from "./game.models";

export default function AbilityCard({
  ability,
  playerPoints,
  gameState,
  player,
  setPoints,
  setActiveEffects,
  setComponentState
}: AbilityCardProps) {
  const cardRef = useRef(null);
  const inputNeeded = ability.name == "EraseEnemyPoints" ? true : false;
  const notEnoughPoints = playerPoints < 500 ? true : false;
  const players = gameState.players.filter((p:Player) => p.name != player.name)

  const [enemyName, setEnemyName] = useState(players[0].name);

  useEffect(()=>{
    console.log(enemyName)
  },[enemyName])
  return (
    <div ref={cardRef} className="ability-card" style={{}} aria-disabled={true}>
      <div className="ability-card-name">{ability.name}</div>
      <div className="ability-card-image">
        <img
          src={`${ReadyImagesURL}/${ability.representingImage}`}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="ability-card-text">
        {ability.explanation}
        <div>
          {inputNeeded && (
            <select value={enemyName} onChange={(e) => setEnemyName(e.target.value)}>
              {players.map((player: Player, index) =>
              (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
          )}
          <button
            disabled={notEnoughPoints}
            onClick={() => {
              if (!inputNeeded) {
                ability.onChoose(
                  gameState.gamecode,
                  player.name,
                  setPoints,
                  setActiveEffects,
                  enemyName
                );
              } else if (enemyName) {
                console.log(enemyName)
                ability.onChoose(
                  gameState.gamecode,
                  player.name,
                  setPoints,
                  setActiveEffects,
                  enemyName
                );
              }
              setComponentState("waitingForOthers")
            }}
          >
            Use ability
          </button>
        </div>
      </div>
    </div>
  );
}

interface AbilityCardProps {
  ability: Ability;
  playerPoints: number;
  gameState: Game;
  player: Player;
  setPoints: any;
  setActiveEffects: any;
  setComponentState:any;
}

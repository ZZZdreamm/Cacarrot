import { useEffect, useRef, useState } from "react";
import { ReadyImagesURL } from "../appUrls";
import { Ability, Game, Player } from "./game.models";

export default function AbilityCard({
  ability,
  playerPoints,
  gameState,
  player,
  setComponentState,
  setLastUsedAbility
}: AbilityCardProps) {
  const cardRef = useRef(null);
  const inputNeeded = ability.name == "EraseEnemyPoints" ? true : false;
  const players = gameState.players.filter(
    (p: Player) => p.name != player.name
  );
  const notEnoughPoints = (playerPoints < 500 || (inputNeeded && players.length == 0)) ? true : false;

  const [enemyName, setEnemyName] = useState(
    players.length > 0 ? players[0].name : ""
  );
  return (
    <div
      ref={cardRef}
      className="ability-card"
      style={{}}
      aria-disabled={notEnoughPoints}
    >
      <div className="ability-card-name">{ability.name}</div>
      <div className="ability-card-image">
        <img
          src={`${ReadyImagesURL}/${ability.representingImage}`}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="ability-card-text">{ability.explanation}</div>
      <div className="ability-card-options">
        {inputNeeded && (
          <select
            value={enemyName}
            onChange={(e) => setEnemyName(e.target.value)}
          >
            {players.map((player: Player, index) => (
              <option key={index} value={player.name}>
                {player.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="ability-card-submit">
        <button
          disabled={notEnoughPoints}
          onClick={() => {
            if (!inputNeeded) {
              ability.onChoose(player.name);
            } else if (enemyName) {
              ability.onChoose(player.name, enemyName);
            }
            setLastUsedAbility(`You have used ${ability.name}!`)
            setComponentState("waitingForOthers");
          }}
        >
          Use ability
        </button>
      </div>
    </div>
  );
}

interface AbilityCardProps {
  ability: Ability;
  gameState: Game;
  player: Player;
  playerPoints: number;
  setComponentState: (state:string) => void;
  setLastUsedAbility:(ability:string) => void;
}

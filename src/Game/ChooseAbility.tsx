import AbilityCard from "./AbilityCard";
import { DoubleNext, PlayerAbilities } from "./PlayerAbilities";
import { Ability, Game, Player } from "./game.models";

export default function ChooseAbility({
  gameState,
  player,
  setComponentState,
}: ChooseAbilityProps) {
  return (
    <>
      <div className="abilities-placeholder">
        {PlayerAbilities.map((ability: Ability, index) => (
          <AbilityCard
            key={index}
            ability={ability}
            playerPoints={player.points}
            gameState={gameState}
            player={player}
            setComponentState={setComponentState}
            />
        ))}
      </div>
      <button
        style={{ marginTop: "2rem" }}
        onClick={() => setComponentState("waitingForOthers")}
      >
        Skip using abilities
      </button>
    </>
  );
}

interface ChooseAbilityProps {
  gameState: Game;
  player: Player;
  setComponentState: any;
}

import {
  setPointsForAnotherPlayer,
  setPointsForPlayer,
} from "../FirebaseDatabase/GamesInDB";
import { Ability } from "./game.models";

export const DoubleNext = (
  gamecode: string,
  playerName: string,
  setPoints: any,
  setActiveEffects: any,
  enemyName?: string,
) => {
    console.log(playerName)
  setPoints((points: number) => {
    const pointsLeft = points - 500;
    setPointsForPlayer(gamecode, playerName, pointsLeft);
    return pointsLeft;
  });
  setActiveEffects((activeEffects: string[]) => {
    const effects = [...activeEffects];
    effects.push("DoubleNext");
    return effects
  });
};

export const EraseEnemyPoints = (
  gamecode: string,
  playerName: string,
  setPoints: any,
  setActiveEffects: any,
  enemyName: string,
) => {
  setPoints((points: number) => {
    setPointsForPlayer(gamecode, playerName, points - 500);
    const pointsLeft = points - 500;
    return pointsLeft;
  });
  setPointsForAnotherPlayer(gamecode, enemyName, -(700));
};

export const PlayerAbilities: Ability[] = [
  {
    name: "DoubleNext",
    cost:500,
    onChoose: DoubleNext,
    representingImage: "2x-image.jpg",
    explanation: "You sacrifice your 500 points to double your next answer points",
  },
  {
    name: "EraseEnemyPoints",
    cost:500,
    onChoose: EraseEnemyPoints,
    representingImage: "thief-stealing.jpg",
    explanation:
      "You sacrifice your 500 points to erase 700 points from choosen player",
  },
];

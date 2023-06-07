import { socket } from "../App";
import { Ability } from "./game.models";

export const DoubleNext = (
  playerName: string
) => {
  socket.emit('used-bonus', {playerName:playerName, bonusName:'DoubleNext'})
};

export const EraseEnemyPoints = (
  playerName: string,
  enemyName: string,
) => {
  socket.emit('used-bonus', {playerName:playerName, bonusName:'EraseEnemyPoints', enemyName:enemyName})
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

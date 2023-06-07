import React from "react";
import { Game } from "./game.models";

const defaultGame : Game = {
  gameTemplate: {id:'', templateName:'', questionTime:5, allQuestions:[]},
  players: [],
  gamecode: '',
  started: "waiting",
  currentQuestion: 0,
  time: 5,
  gamePhase: 1,
  startingTime: 3,
  winners: [],
  hostConnection: true,
  hostId:''
};
const GameStateContext = React.createContext<{
  gameState: Game;
  updateGameState(gameState: Game): void;
}>({ gameState: defaultGame, updateGameState: () => {} });

export default GameStateContext;

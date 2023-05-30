import { gamesRef } from "../FirebaseDatabase/FirebaseConfig";
import { createGameInDB, setDataInDB } from "../FirebaseDatabase/GamesInDB";
import { Answer, Game, Player } from "./game.models";

export function startGame(game: Game, setGame: (e: any) => void) {
  if (game!.players.length >= 1) {
    setGame({
      ...game!,
      started: "started",
    });
    setDataInDB(game.gamecode, "started", "gameStarted");
  }
}

export const fetchGame = async (gameState: any, setGame: (e: any) => void) => {
  const snapshot = await gamesRef.child(gameState.gamecode).once("value");
  const fetchedData = snapshot.val();

  let transformedData: Game = {
    gameTemplate: gameState.template,
    players: [],
    gamecode: gameState.gamecode,
    started: "waiting",
    currentQuestion: 0,
    time: gameState.template.questionTime,
    gamePhase: 1,
    startingTime:3,
    winners:[],
    hostConnection:true
  };
  if (fetchedData) {
    const {
      gameTemplate,
      gamecode,
      players,
      started,
      currentQuestion,
      time,
      gamePhase,
      startingTime,
      winners,
      hostConnection
    } = fetchedData??{};
    let myPlayers: any = players
      ? Object.values(players).map((player: any) => {
          const { id, name, points, lastAnswer, shownComponent } = player ?? {};
          const newPlayer: Player = {
            id,
            name,
            points,
            lastAnswer,
            shownComponent,
          };
          return newPlayer;
        })
      : [];
    transformedData = {
      gameTemplate,
      gamecode,
      players: myPlayers,
      started,
      currentQuestion,
      time,
      gamePhase,
      startingTime,
      winners,
      hostConnection
    };
    setGame(transformedData);
  } else {
    await createGameInDB(transformedData);
  }
};

export function getWinners(players: Player[], setWinners: (e: any) => void) {
  let sortedPlayers = players.sort(
    (player1, player2) => player2.points - player1.points
  );
  const localWinners = sortedPlayers.slice(0, 2)
  setWinners(localWinners);
}


export function getSortedPlayers(players: Player[], setPlayers: (e: any) => void) {
  let sortedPlayers = players.sort(
    (player1, player2) => player2.points - player1.points
  );
  setPlayers(sortedPlayers);
}


export function playerLeavesGame(gamecode:string, playerId:number){
  gamesRef.child(gamecode).child('players').child(`${playerId}`).remove()
}
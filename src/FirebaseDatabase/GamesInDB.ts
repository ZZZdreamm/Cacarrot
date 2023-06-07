import { Game, Player } from "../Game/game.models";
import { db, dbRef, gamesRef } from "./FirebaseConfig";
import { getDatabase, ref, onValue } from "firebase/database";

export async function createGameInDB(game: Game) {
  const recordQuery = gamesRef.orderByChild("name").equalTo(game.gamecode);
  await recordQuery.once(
    "value",
    (snapshot) => {
      const recordExists = snapshot.exists();
      if (recordExists) {
        gamesRef.child(game.gamecode).remove();
      }
      gamesRef.child(game.gamecode).set(game);
    },
    (error) => {
      console.error("Error checking record existence: ", error);
    }
  );
}

export async function checkIfGamecodeIsInDB(
  inputtedGamecode: string,
  setGoodCode: any,
  setWrongCode: any
) {
  await gamesRef.once("value", (snapshot) => {
    const games = snapshot.val();
    Object.keys(games).forEach((gamecode) => {
      const game = games[gamecode];
      if (inputtedGamecode == gamecode && game.started == "waiting") {
        var playersCount = game.players ? Object.keys(game.players).length : 0;
        if (playersCount < 10) {
          setGoodCode(true);
        } else {
          setWrongCode("Maximum amount of players reached!");
        }
      }
    });
    setWrongCode("Wrong code!");
  });
}

export async function checkIfUniqueName(
  gamecode: string,
  name: string,
  setGoodName: (e: any) => void,
  setError: (e: any) => void
) {
  let unique = true;
  await gamesRef
    .child(gamecode)
    .child("players")
    .once("value", (snapshot) => {
      const players = snapshot.val();
      if (players) {
        Object.values(players).forEach((player: any) => {
          if (player.name == name) {
            unique = false;
          }
        });
      }
    });
  if (unique) {
    setGoodName(true);
  } else {
    setError("There is player with that name");
  }
}

export async function getGameData(gamecode: string, setGame: any) {
  gamesRef.child(gamecode).on("value", (dataSnapshot) => {
    const gameData = dataSnapshot.val();
    let transformedData = {};
    if (gameData) {
      const {
        gameTemplate,
        gamecode,
        players,
        started,
        currentQuestion,
        gamePhase,
        time,
        startingTime,
        hostConnection,
        hostId,
        winners
      } = gameData ?? {};
      let myPlayers: any = [];
      if (players) {
        Object.values(players).forEach((player: any) => {
          const { id, name, points, answers, shownComponent } = player ?? {};
          if (answers) {
            const newPlayer: Player = {
              id,
              name,
              points,
              answers,
              shownComponent,
            };
            myPlayers.push(newPlayer);
          } else {
            const newPlayer: Player = {
              id,
              name,
              points,
              answers: [],
              shownComponent: "answers",
            };
            myPlayers?.push(newPlayer);
          }
        });
      }
      transformedData = {
        gameTemplate,
        gamecode,
        players: myPlayers,
        started,
        currentQuestion,
        gamePhase,
        time,
        startingTime,
        hostConnection,
        hostId,
        winners
      };
      setGame(transformedData);
    }
  });
}

export async function getGameStart(gamecode: string, setGameStart: any) {
  gamesRef
    .child(gamecode)
    .child("started")
    .on("value", (snapshot) => {
      const data = snapshot.val();
      setGameStart(data);
    });
}



export async function getPlayer(
  gamecode: string,
  playerName: string,
  setPlayer: any
) {
  gamesRef
    .child(gamecode)
    .child("players")
    .once("value", (snapshot) => {
      const players = snapshot.val();
      players.forEach((player: Player) => {
        if (player.name == playerName) {
          setPlayer(player);
        }
      });
    });
}

export async function getOnShownComponent(
  gamecode: string,
  playerId: number,
  setShownComponent: (e: any) => void
) {
  gamesRef
    .child(gamecode)
    .child("players")
    .child(`${playerId}`)
    .child("shownComponent")
    .on("value", (snapshot) => {
      const shownComponent = snapshot.val();
      if (shownComponent) {
        setShownComponent(shownComponent);
      }
    });
}

//
export async function getOnStartingTime(
  gamecode: string,
  setGame: (game: any) => void
) {
  gamesRef
    .child(gamecode)
    .child("startingTime")
    .on("value", (snapshot) => {
      const time = snapshot.val();
      setGame((game:Game) => {
        return {
          ...game,
          startingTime:time
        }
      });
    });
}

export async function getOnWinners(
  gamecode: string,
  setGame: (e: any) => void
) {
  gamesRef
    .child(gamecode)
    .child("winners")
    .on("value", (snapshot) => {
      const winners = snapshot.val();
      setGame((game: any) => {
        return {
          ...game,
          winners: winners,
        };
      });
    });
}



export const setDataInDB = async (
  gamecode: string,
  data: any,
  actionType: string,
  playerId?: number
) => {
  if (actionType == "game") {
    await gamesRef.child(gamecode).set(data);
  } else if (actionType == "currentQuestion") {
    await gamesRef.child(gamecode).child("currentQuestion").set(data);
  } else if (actionType == "time") {
    await gamesRef.child(gamecode).child("time").set(data);
  } else if (actionType == "questionDone") {
    await gamesRef.child(gamecode).child("currentQuestion").set(data);
  } else if (actionType == "points") {
    await gamesRef
      .child(gamecode)
      .child("players")
      .child(`${playerId}`)
      .child("points")
      .set(data);
  } else if (actionType == "game") {
    await gamesRef.child(gamecode).set(data);
  } else if (actionType == "shownComponent") {
    await gamesRef
      .child(gamecode)
      .child("players")
      .child(`${playerId}`)
      .child("shownComponent")
      .set(data);
  } else if (actionType == "players") {
    await gamesRef.child(gamecode).child("players").set(data);
  } else if (actionType == "gamePhase") {
    await gamesRef.child(gamecode).child("gamePhase").set(data);
  } else if (actionType == "lastAnswer") {
    await gamesRef
      .child(gamecode)
      .child("players")
      .child(`${playerId}`)
      .child("lastAnswer")
      .set(data);
  } else if (actionType == "gameStarted") {
    await gamesRef.child(gamecode).child("started").set(data);
  } else if (actionType == "startingTime") {
    await gamesRef.child(gamecode).child("startingTime").set(data);
  } else if (actionType == "winners") {
    await gamesRef.child(gamecode).child("winners").set(data);
  } else if (actionType == "hostShowing") {
    await gamesRef.child(gamecode).child("hostShowing").set(data);
  }
};

export const fetchData = async (
  gamecode: string,
  data: any,
  setGame: (game: any) => void,
  actionType: string,
) => {
  const snapshot: any = await chooseTypeOnce(actionType, gamecode);
  let fetchedData = snapshot.val();

  if (actionType == "players") {
    setGame((game: Game) => {
      return {
        ...game,
        players: fetchedData,
      };
    });
  } else if (actionType == "time") {
    setGame((game: Game) => {
      return {
        ...game,
        time: fetchedData,
      };
    });
  } else if (actionType == "startingTime") {
    setGame((game:Game) => {
      return {
        ...game,
        startingTime: fetchedData,
      };
    });
  } else if (actionType == "hostConnection") {
    setGame((game: Game) => {
      return {
        ...game,
        hostConnection: fetchedData,
      };
    });
  } else if (actionType == "winners") {
    setGame((game: Game) => {
      return {
        ...game,
        winners: fetchedData,
      };
    });
  } else if (actionType == "gamePhase") {
    setGame((game: Game) => {
      return {
        ...game,
        gamePhase: fetchedData,
      };
    });
  } else if (actionType == "currentQuestion") {
    setGame((game: Game) => {
      return {
        ...game,
        currentQuestion: fetchedData,
      };
    });
  }
};

async function chooseTypeOnce(
  actionType: string,
  gamecode: string,
  playerId?: number
) {
  if (actionType == "currentQuestion") {
    return await gamesRef
      .child(gamecode)
      .child("currentQuestion")
      .once("value");
  } else if (actionType == "time") {
    return await gamesRef.child(gamecode).child("time").once("value");
  } else if (actionType == "questionDone") {
    return await gamesRef
      .child(gamecode)
      .child("currentQuestion")
      .once("value");
  } else if (actionType == "points") {
    return await gamesRef
      .child(gamecode)
      .child("players")
      .child(`${playerId}`)
      .child("points")
      .once("value");
  } else if (actionType == "shownComponent") {
    return await gamesRef
      .child(gamecode)
      .child("players")
      .child(`${playerId}`)
      .child("shownComponent")
      .once("value");
  }else if (actionType == "game") {
    return await gamesRef.child(gamecode).once("value");
  }  else if (actionType == "players") {
    return await gamesRef.child(gamecode).child("players").once("value");
  } else if (actionType == "gamePhase") {
    return await gamesRef.child(gamecode).child("gamePhase").once("value");
  } else if (actionType == "startingTime") {
    return await gamesRef.child(gamecode).child("startingTime").once("value");
  } else if (actionType == "winners") {
    return await gamesRef.child(gamecode).child("winners").once("value");
  } else if (actionType == "hostConnection") {
    return await gamesRef.child(`${gamecode}/hostConnection`).once("value");
  }
}


export const fetchPlayerData = async (
  gamecode: string,
  data: any,
  setData: (data: any) => void,
  actionType: string,
  playerId?: number
) => {
  const snapshot: any = await chooseTypeOnce(actionType, gamecode, playerId);
  let fetchedData = snapshot.val()

  if (typeof data == "number") {
    if (typeof fetchedData == "number") {
      setData(fetchedData);
    } else {
      setData(data);
    }
  } else if (fetchedData) {
    setData(fetchedData);
  } else {
    setData(data);
  }

};

export async function getOnPlayerPoints(gamecode:string, playerId:number, setPoints:(points:number) => void) {
  gamesRef
    .child(gamecode)
    .child("players")
    .child(`${playerId}`).child('points').on('value', (snapshot) => {
      const points = snapshot.val()
      setPoints(points)
    })
}



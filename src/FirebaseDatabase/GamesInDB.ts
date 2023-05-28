import { Game, Player } from "../Game/game.models";
import { gamesRef } from "./FirebaseConfig";

export async function createGameInDB(game:Game) {
    const recordQuery = gamesRef.orderByChild('name').equalTo(game.gamecode);
    await recordQuery.once('value', (snapshot) => {
      const recordExists = snapshot.exists();
      if (recordExists) {
        gamesRef.child(game.gamecode).remove()
      }
      gamesRef.child(game.gamecode).set(game)
    }, (error) => {
      console.error('Error checking record existence: ', error);
    });
  }


  export async function checkIfGamecodeIsInDB(inputtedGamecode:string, setGoodCode:any, setWrongCode:any) {
    await gamesRef.once('value', (snapshot) =>{
        const games = snapshot.val()
        Object.keys(games).forEach((gamecode) =>{
          const game = games[gamecode]
          if(inputtedGamecode == gamecode && game.started == 'waiting'){
            var playersCount = game.players ? Object.keys(game.players).length : 0
            if(playersCount < 10){
              setGoodCode(true)
            }
            else{
              setWrongCode('Maximum amount of players reached!')
            }
          }
        })
        setWrongCode('Wrong code!')
    })
  }

  export async function getGameData(gamecode:string, setGame:any, turnOffAfter?:boolean) {
    gamesRef.child(gamecode).on('value', (dataSnapshot) => {
      const gameData = dataSnapshot.val()
      let transformedData = {}
      if(gameData){
        const {gameTemplate, gamecode, players, started, currentQuestion, gamePhase, time} = gameData??{}
        let myPlayers : any = []
        if(players){
          Object.values(players).forEach((player:any) => {
            const {id, name, points, lastAnswer, shownComponent} = player??{}
            if(lastAnswer){
              const newPlayer: Player = {id, name, points, lastAnswer, shownComponent}
              myPlayers.push(newPlayer)
            }else{
              const newPlayer: Player = {id, name, points, lastAnswer:{choosenAnswer:'', sendingTime:0, questionNumber:1}, shownComponent:'answers'}
              myPlayers?.push(newPlayer)
            }
          })
        }
        transformedData = {gameTemplate, gamecode, players:myPlayers, started, currentQuestion, gamePhase, time}
        setGame(transformedData)
      }
    })
  }


  export async function joinGame(gamecode:string, player:Player) {
      gamesRef.child(gamecode).child('players').once('value', (snapshot) =>{
        const players = snapshot.val()
        var playersCount = players ? Object.keys(players).length : 0
        gamesRef.child(gamecode).child('players').child(`${playersCount}`).set(player)
      })
  }

  export async function getGameStart(gamecode:string, setGameStart:any){
    gamesRef.child(gamecode).child('started').on('value', (snapshot) => {
        const data = snapshot.val()
        // console.log(data)
        setGameStart(data)
    })
  }

  export async function sendAnswerToDB(gamecode:string, playerName:string, answer:string, currentQuestion:number, sendingTime:number) {
    gamesRef.child(gamecode).child('players').once('value', (snapshot) => {
        const players = snapshot.val()
        players.forEach((player:Player) => {
          if(player.name == playerName){
            gamesRef.child(gamecode).child('players').child(`${player.id}`).child('lastAnswer').set({choosenAnswer:answer, sendingTime:sendingTime, questionNumber:currentQuestion})
          }
        });
    })
  }

  export async function checkIfAnswerSended(gamecode:string, playerName:string, setAnswerSended: (e:any) => void) {
    await gamesRef.child(gamecode).child('players').once('value', (snapshot) => {
      const players = snapshot.val()
      players.forEach((player:Player) => {
        if(player.name == playerName){
          gamesRef.child(gamecode).child('currentQuestion').once('value', (snapshot) => {
            const currentQuestion = snapshot.val()
            gamesRef.child(gamecode).child('players').child(`${player.id}`).child('lastAnswer').once('value', (snapshot) => {
              const lastAnswer = snapshot.val()
              if(currentQuestion == lastAnswer.questionNumber){

              }
            })
          })

        }
      });
  })
  }

  export async function setCurrentQuestionInDB(gamecode:string, questionNumber:number) {
    gamesRef.child(gamecode).child('currentQuestion').set(questionNumber)
  }



  export async function getCurrentQuestionFromDB(gamecode:string, setCurrentQuestion:any) {
    gamesRef.child(gamecode).child('currentQuestion').on('value', (snapshot) => {
      const currentQuestion = snapshot.val()
      setCurrentQuestion(currentQuestion)
    })
  }

  export async function setPointsForPlayer(gamecode:string, playerName:string, points:number) {
    gamesRef.child(gamecode).child('players').once('value', (snapshot) => {
      const players = snapshot.val()
      players.forEach((player:Player) => {
        if(player.name == playerName){
          gamesRef.child(gamecode).child('players').child(`${player.id}`).child('points').set(points)
        }
      });
  })
  }

  export async function getTimeFromDB(gamecode:string, setTime:any) {
    gamesRef.child(gamecode).child('time').on('value', (snapshot) => {
      const time = snapshot.val()
      if(time != null){
        setTime(time)
      }
    })
  }

  export async function getPlayer(gamecode:string, playerName:string, setPlayer:any) {
    gamesRef.child(gamecode).child('players').once('value', (snapshot) => {
      const players = snapshot.val()
      players.forEach((player:Player) => {
        if(player.name == playerName){
          setPlayer(player)
        }
      });
  })
  }

  export async function getOnShownComponent(gamecode:string, playerId:number, setShownComponent: (e:any) => void) {
     gamesRef.child(gamecode).child('players').child(`${playerId}`).child('shownComponent').on('value', (snapshot) => {
      const shownComponent = snapshot.val()
      if(shownComponent){
        setShownComponent(shownComponent)
      }
     })
  }

  export const setDataInDB = async (gamecode:string, data:any, actionType:string, playerId?:number) => {
    if(actionType == 'game'){
      await gamesRef.child(gamecode).set(data)
    }else if(actionType == 'currentQuestion'){
      await gamesRef.child(gamecode).child('currentQuestion').set(data)
    }else if(actionType == 'time'){
      await gamesRef.child(gamecode).child('time').set(data)
    }else if(actionType == 'questionDone'){
      await gamesRef.child(gamecode).child('currentQuestion').set(data)
    }else if(actionType == 'points'){
      await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('points').set(data)
    }else if(actionType == 'game'){
      await gamesRef.child(gamecode).set(data)
    }else if(actionType == 'shownComponent'){
      await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('shownComponent').set(data)
    }else if(actionType == 'players'){
      await gamesRef.child(gamecode).child('players').set(data)
    }else if(actionType == 'gamePhase'){
      await gamesRef.child(gamecode).child('gamePhase').set(data)
    }else if(actionType == 'lastAnswer'){
      await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('lastAnswer').set(data)
    }else if(actionType == 'gameStarted'){
      await gamesRef.child(gamecode).child('started').set(data)
    }
  }

  export const fetchData = async (gamecode:string, data :any, setData:(e:any) => void, actionType:string, playerId?:number) => {
    const snapshot :any = await chooseTypeOnce(actionType, gamecode, playerId)
    let fetchedData = snapshot.val();
    if (fetchedData) {
      setData(fetchedData);
    } else {
      setData(data)
    }
  };

  async function chooseTypeOnce(actionType:string, gamecode:string, playerId?:number){
    if(actionType == 'currentQuestion'){
      return await gamesRef.child(gamecode).child('currentQuestion').once('value')
    }else if(actionType == 'time'){
      return await gamesRef.child(gamecode).child('time').once('value')
    }else if(actionType == 'questionDone'){
      return await gamesRef.child(gamecode).child('currentQuestion').once('value')
    }else if(actionType == 'points'){
      return await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('points').once('value')
    }else if(actionType == 'game'){
      return await gamesRef.child(gamecode).once('value')
    }else if(actionType == 'shownComponent'){
      return await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('shownComponent').once('value')
    }else if(actionType == 'players'){
      return await gamesRef.child(gamecode).child('players').once('value')
    }else if(actionType == 'gamePhase'){
      return await gamesRef.child(gamecode).child('gamePhase').once('value')
    }else  if(actionType == 'currentQuestionIndex'){
      return await gamesRef.child(gamecode).child('currentQuestion').once('value')
    }else if(actionType == 'lastAnswer'){
      return await gamesRef.child(gamecode).child('players').child(`${playerId}`).child('lastAnswer').once('value')
    }
  }
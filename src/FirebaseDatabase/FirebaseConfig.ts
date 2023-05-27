import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore"
// import { initializeApp } from "firebase/app";
// import "firebase/database";
import { Game, GameTemplate, Player } from "../Game/game.models";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDusTR62nXSXyjblgvFNIFGepxtzYxHVF8",
  authDomain: "kakoot-d06ff.firebaseapp.com",
  databaseURL: "https://kakoot-d06ff-default-rtdb.firebaseio.com",
  projectId: "kakoot-d06ff",
  storageBucket: "kakoot-d06ff.appspot.com",
  messagingSenderId: "594818848188",
  appId: "1:594818848188:web:331461933f89b9bcb707b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//@ts-ignore
const dbRef = firebase.database().ref()
const usersRef = dbRef.child('users')
export const gamesRef = dbRef.child('games')



export async function saveTemplateInDB(userId:string, gameTemplate:GameTemplate){
    await usersRef.child(userId).child('templates').child(gameTemplate.templateName).set(gameTemplate)
}

export async function getUserTemplates(userId:string, callback:any){
  await usersRef.child(userId).child('templates').once('value', (snapshot) => {
    const userData = snapshot.val()
    let templates : GameTemplate[] = []
    Object.values(userData).forEach((value : any) => {
      const {allQuestions, id, questionTime, templateName} = value??{}
      const template : GameTemplate = {
        allQuestions:allQuestions,
        id:id,
        questionTime:questionTime,
        templateName:templateName
      }
      templates.push(template)
    })
    callback(templates)
  }, (error) =>{
    console.error('Error retrieving data ', error)
  })
}

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
      // console.log(transformedData)
      setGame(transformedData)
      // if(turnOffAfter){
      //   console.log('sd')
      //   gamesRef.child(gamecode).off()
      // }

    }
  })
}

export async function sendGameData(gamecode:string, game:Game) {
    console.log(game)
    gamesRef.child(gamecode).set(game)
}


export async function joinGame(gamecode:string, player:Player) {
    gamesRef.child(gamecode).child('players').once('value', (snapshot) =>{
      const players = snapshot.val()
      var playersCount = players ? Object.keys(players).length : 0
      // console.log(player.id)
      gamesRef.child(gamecode).child('players').child(`${playersCount}`).set(player)
    })
}
// export async function leaveGame(gamecode:string, playerName:string) {
//   gamesRef.child(gamecode).child('players').once('value', (snapshot) =>{
//       const players = snapshot.val()
//       players.forEach((player:Player) => {
//           if(player.name == playerName){
//             gamesRef.child(gamecode).child('players').child(`${player.id}`).remove()
//           }
//       });
//   })
// }

export async function getGameStart(gamecode:string, setGameStart:any){
  gamesRef.child(gamecode).child('started').on('value', (snapshot) => {
      const data = snapshot.val()
      // console.log(data)
      setGameStart(data)
  })
}


export async function setGameStarted(gamecode:string, value:string) {
  // console.log(value)
  gamesRef.child(gamecode).child('started').set(value)
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
  console.log()
  gamesRef.child(gamecode).child('currentQuestion').set(questionNumber)
}

export async function getQuestionsDoneFromDB(gamecode:string, setCurrentQuestion:any) {
  gamesRef.child(gamecode).child('currentQuestion').once('value', (snapshot) => {
    const currentQuestion = snapshot.val()
    setCurrentQuestion(currentQuestion)
  })
}


export async function getCurrentQuestionFromDB(gamecode:string, setCurrentQuestion:any) {
  gamesRef.child(gamecode).child('currentQuestion').on('value', (snapshot) => {
    const currentQuestion = snapshot.val()
    // console.log(`current question gotten ${currentQuestion}`)
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


export async function setTimeInDB(gamecode:string, time:number) {
  gamesRef.child(gamecode).child('time').set(time)
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

export async function setShownComponentInDB(gamecode:string, shownComponent:string, playerId:number) {
  gamesRef.child(gamecode).child('players').child(`${playerId}`).child('shownComponent').set(shownComponent)
}

export async function getOnShownComponent(gamecode:string, playerId:number, setShownComponent: (e:any) => void) {
   gamesRef.child(gamecode).child('players').child(`${playerId}`).child('shownComponent').on('value', (snapshot) => {
    const shownComponent = snapshot.val()
    if(shownComponent){
      setShownComponent(shownComponent)
    }
   })
}
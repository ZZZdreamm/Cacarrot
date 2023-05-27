import { gamesRef, getPlayer } from "../FirebaseDatabase/FirebaseConfig";

export const removeItemFromState = async (itemToRemoveIndex: number, setItems: any) => {
  setItems((prevItems: any) => {
    if(prevItems.length > 1){
      return prevItems.filter((item: any) => item !== prevItems[itemToRemoveIndex-1]);
    }else{
      return prevItems
    }
  });
};

export const addItemToState = async (itemToAdd:any, setItems:any) => {
  setItems((prevItems:any) => [...prevItems, itemToAdd])
}

export const setDataInDB = async (gamecode:string, data:any, actionType:string, playerId?:number) => {
  if(actionType == 'gamePhase'){
    gamesRef.child(gamecode).child('gamePhase').set(data)
  }
}

export const fetchData = async (gamecode:string, data :any, setData:(e:any) => void, actionType:string, playerId?:number) => {
  const snapshot :any = await chooseType(actionType, gamecode, playerId)

  let fetchedData = snapshot.val();
  if (fetchedData) {
    setData(fetchedData);
  } else {
    setData(data)
  }
};



async function chooseType(actionType:string, gamecode:string, playerId?:number){
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
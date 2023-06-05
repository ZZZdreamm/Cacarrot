import { useEffect, useState } from "react";
import MyInput from "../Utilities/MyInput";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIfUniqueName, getGameData, joinGame } from "../FirebaseDatabase/GamesInDB";
import DisplayErrors from "../Utilities/DisplayErrors";
import { socket } from "../App";

export default function InputName(){
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [game, setGame] = useState()
    const [goodName, setGoodName] = useState()
    const [error, setError] = useState()
    const [playerId, setPlayerId] = useState<number>()

    useEffect(()=>{
        socket.emit('gamecode', state)
        socket.on(`joined/${state}/${socket.id}`, (data)=> {
            console.log(username)
            const dataState = {game:data.game, username:data.playerName, playerId:data.playerId}
            navigate('/waiting-room', {state: dataState})
        })
    },[])

    useEffect(()=>{
        if(goodName && username){
            console.log(state)
            socket.emit(`player-join`, {socketId:socket.id, playerName:username})
            // joinGame(state, {id:0, name:username, points:0, lastAnswer:{choosenAnswer:'', sendingTime:0, questionNumber:1}, shownComponent:'answers'}, setPlayerId)
            // getGameData(state, setGame)
        }
    },[goodName])


    // useEffect(()=>{
    //     if(game && typeof playerId == 'number'){
    //         console.log(playerId)
    //         const dataState = {game:game, username:username, playerId:playerId}
    //         navigate('/waiting-room', {state: dataState})
    //     }
    // },[game, playerId])


    function submitName(){
        checkIfUniqueName(state, username, setGoodName, setError)
        // socket.emit('halo')
    }
    return(
        <>
            <MyInput value={username} setValue={setUsername} placeholder={'Input your name'} characterLimit={15} visibleWarning={true}/>
            <div className="error">{error}</div>
            <button onClick={submitName}>Submit name</button>
        </>
    )
}
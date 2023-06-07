import { useEffect, useState } from "react";
import MyInput from "../Utilities/MyInput";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIfUniqueName } from "../FirebaseDatabase/GamesInDB";
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
            const dataState = {game:data.game, username:data.playerName, playerId:data.playerId}
            navigate('/waiting-room', {state: dataState})
        })
    },[])

    useEffect(()=>{
        if(goodName && username){
            socket.emit(`player-join`, {socketId:socket.id, playerName:username})
            setGoodName(undefined)
        }
    },[goodName])


    function submitName(){
        checkIfUniqueName(state, username, setGoodName, setError)
    }
    return(
        <>
            <MyInput value={username} setValue={setUsername} placeholder={'Input your name'} characterLimit={15} visibleWarning={true}/>
            <div className="error">{error}</div>
            <button onClick={submitName}>Submit name</button>
        </>
    )
}
import { useEffect, useState } from "react";
import MyInput from "../Utilities/MyInput";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIfUniqueName, getGameData, joinGame } from "../FirebaseDatabase/GamesInDB";
import DisplayErrors from "../Utilities/DisplayErrors";

export default function InputName(){
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [game, setGame] = useState()
    const [goodName, setGoodName] = useState()
    const [error, setError] = useState()
    const [playedId, setPlayerId] = useState<number>()
    function submitName(){
        checkIfUniqueName(state, username, setGoodName, setError)
    }
    useEffect(()=>{
        if(goodName && username){
            joinGame(state, {id:0, name:username, points:0, lastAnswer:{choosenAnswer:'', sendingTime:0, questionNumber:1}, shownComponent:'answers'}, setPlayerId)
            getGameData(state, setGame)
        }
    },[goodName])


    useEffect(()=>{
        if(game && typeof playedId == 'number'){
            const dataState = {game:game, username:username, playedId:playedId}
            navigate('/waiting-room', {state: dataState})
        }
    },[game, playedId])
    return(
        <>
            <MyInput value={username} setValue={setUsername} placeholder={'Input your name'} characterLimit={15} visibleWarning={true}/>
            <div className="error">{error}</div>
            <button onClick={submitName}>Submit name</button>
        </>
    )
}
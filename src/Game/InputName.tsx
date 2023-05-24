import { useEffect, useState } from "react";
import MyInput from "../Utilities/MyInput";
import { useLocation, useNavigate } from "react-router-dom";
import { getGameData, joinGame } from "../FirebaseDatabase/FirebaseConfig";

export default function InputName(){
    const location = useLocation();
    //@ts-ignore
    const { state } = location;
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [game, setGame] = useState()
    function submitName(){
        joinGame(state, {id:0, name:username, points:0, lastAnswer:{choosenAnswer:'', sendingTime:0, questionNumber:1}})
        getGameData(state, setGame)
    }
    useEffect(()=>{
        if(game){
            const dataState = {game:game, username:username}
            navigate('/waiting-room', {state: dataState})
        }
    },[game])
    return(
        <>
            <MyInput value={username} setValue={setUsername} placeholder={'Input your name'} characterLimit={15} visibleWarning={true}/>
            <button onClick={submitName}>Submit name</button>
        </>
    )
}
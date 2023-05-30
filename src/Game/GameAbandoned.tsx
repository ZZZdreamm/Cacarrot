import { useNavigate } from "react-router-dom"

export default function GameAbandoned(){
    const navigate =useNavigate()
    return(
        <>
            <h1>Game has been abandoned</h1>
            <button onClick={()=>navigate('/')}>Return back to menu</button>
        </>
    )
}
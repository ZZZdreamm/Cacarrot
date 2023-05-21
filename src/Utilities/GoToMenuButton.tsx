import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function GoToMenuButton(){
    const navigate = useNavigate()
    return(
        <button className="go-back-button" onClick={()=>{navigate('/')}}>Cacarrot</button>
    )
}
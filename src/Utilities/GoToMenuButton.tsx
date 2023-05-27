import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function GoToMenuButton(){
    const navigate = useNavigate()
    return(
        <button className="go-back-button" style={{height:'fit-content'}} onClick={()=>{navigate('/')}}>Cacarrot</button>
    )
}
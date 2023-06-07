import { ReadyImagesURL } from "../appUrls";
import { Player } from "./game.models";

export default function SingleWinner({name, points, statsColor, winImage} : SingleWinnerProps){
    return(
        <div className="player-stats" style={{ backgroundColor: statsColor }}>
          <div className="img-name-container" style={{ height: "100%" }}>
            <img
              className="winners-image"
              src={`${ReadyImagesURL}/${winImage}`}
            />
            <span>{name}</span>
          </div>
          <span  style={{marginLeft:'2rem'}}>Score: {points}</span>
        </div>
    )
}


interface SingleWinnerProps{
    name:string;
    points:number;
    statsColor:string;
    winImage:string;
}
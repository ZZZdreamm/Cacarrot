import { ReadyImagesURL } from "../appUrls";
import { Player } from "./game.models";

export default function SingleWinner({name, points, statsColor} : SingleWinnerProps){
    return(
        <div className="player-stats" style={{ backgroundColor: statsColor }}>
          <div className="img-name-container" style={{ height: "100%" }}>
            <img
              className="winners-image"
              src={`${ReadyImagesURL}/first-place.png`}
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
}
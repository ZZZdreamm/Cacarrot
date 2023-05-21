import { ReadyImagesURL } from "../appUrls";
import { Player } from "./game.models";

//@ts-ignore
export default function Winners({ winners }) {
  return (
    <>
      <div className="player-stats-list column-shaped-container">
        <div className="player-stats" style={{backgroundColor:'#ffd700'}}>
            <img className="winners-image" src={`${ReadyImagesURL}/first-place.png`}/>
          <span>{winners[0].name}</span>
          <span>Score: {winners[0].points}</span>
        </div>
        <div className="player-stats" style={{backgroundColor:'#C0C0C0'}}>
        <img className="winners-image" src={`${ReadyImagesURL}/second-place.jpg`}/>

          <span>{winners[1].name}</span>
          <span>Score: {winners[1].points}</span>
        </div>
        <div className="player-stats" style={{backgroundColor:'#CD7F32'}}>
        <img className="winners-image" src={`${ReadyImagesURL}/third-place.jpg`}/>

          <span>{winners[2].name}</span>
          <span>Score: {winners[2].points}</span>
        </div>
      </div>
    </>
  );
}

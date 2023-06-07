import { useNavigate } from "react-router-dom";
import { Player } from "./game.models";
import SingleWinner from "./SingleWinner";

export default function Winners({ winners }: WinnersProps) {
  const navigate = useNavigate();
  let winnersToMap;
  if(winners){
    winnersToMap = [{name:winners[0].name, points: winners[0].points, statsColor:"#ffd700", winImage:'first-place.png'},
    {name:winners[1] ? winners[1].name : null, points: winners[1] ? winners[1].points : 0, statsColor:"#C0C0C0", winImage:'second-place.jpg'},
    {name:winners[2] ? winners[2].name : null, points: winners[2] ? winners[2].points : 0, statsColor:"#CD7F32", winImage:'third-place.jpg'}
  ]
  }

  return (
    <>
      <div
        className="player-stats-list column-shaped-container"
        style={{ margin: "10% 0 0 0", maxHeight: "40%", overflow:'visible'}}
      >
        <h1>Winners</h1>
        {winnersToMap && winnersToMap.map((winner) =>(
          winner.name && <SingleWinner key={winner.name} name={winner.name} points={winner.points} statsColor={winner.statsColor} winImage={winner.winImage}/>
        ))}

        <button
          style={{ marginTop: "10%" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to menu
        </button>
      </div>
    </>
  );
}


interface WinnersProps{
  winners:Player[];
}
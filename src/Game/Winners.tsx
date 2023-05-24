import { useNavigate } from "react-router-dom";
import { ReadyImagesURL } from "../appUrls";
import { Player } from "./game.models";

//@ts-ignore
export default function Winners({ winners }) {
  const navigate = useNavigate();
  console.log(winners)
  return (
    <>
      <div
        className="player-stats-list column-shaped-container"
        style={{ margin: "10% 0 0 0", maxHeight: "40%" }}
      >
        <div className="player-stats" style={{ backgroundColor: "#ffd700" }}>
          <div className="img-name-container" style={{ height: "100%" }}>
            <img
              className="winners-image"
              src={`${ReadyImagesURL}/first-place.png`}
            />
            <span>{winners[0].name}</span>
          </div>
          <span>Score: {winners[0].points}</span>
        </div>
        {winners[1] && (
          <div className="player-stats" style={{ backgroundColor: "#C0C0C0" }}>
            <div className="img-name-container" style={{ height: "100%" }}>
              <img
                className="winners-image"
                src={`${ReadyImagesURL}/second-place.jpg`}
              />
              <span>{winners[1].name}</span>
            </div>
            <span>Score: {winners[1].points}</span>
          </div>
        )}
        {winners[2] && (
          <div className="player-stats" style={{ backgroundColor: "#CD7F32" }}>
            <div className="img-name-container" style={{ height: "100%" }}>
              <img
                className="winners-image"
                src={`${ReadyImagesURL}/third-place.jpg`}
              />
              <span>{winners[2].name}</span>
            </div>
            <span>Score: {winners[2].points}</span>
          </div>
        )}

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

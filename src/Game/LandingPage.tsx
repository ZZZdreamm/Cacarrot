import { useNavigate } from "react-router-dom";
import Authorized from "../auth/Authorized";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
    {/* // <main className="wrapper">
    //   <section className="landing-page"> */}
        <h1>Cacarrot</h1>
        <p className="paragraph">
          <Authorized
            isAuthorized={
              <button
                className="my-button"
                onClick={() => {
                  navigate("create");
                }}
              >
                Create your own Cacarrot
              </button>
            }
            notAuthorized={
              <>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
              </>
            }
          />
        </p>
        <p className="paragraph">
          <div>Join game with code</div>
          <input className="my-input" placeholder="Put in game code" />
          <button className="my-button">Join</button>
        </p>
    {/* //   </section>
    // </main> */}
    </>
  );
}

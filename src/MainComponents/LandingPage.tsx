import { useNavigate } from "react-router-dom";
import Authorized from "../auth/Authorized";
import MyInput from "../Utilities/MyInput";
import { useContext, useEffect, useState } from "react";
import { checkIfGamecodeIsInDB } from "../FirebaseDatabase/GamesInDB";
import { ReadyImagesURL } from "../appUrls";
import SnowingEffect from "../Utilities/SnowingEffect";

export default function LandingPage() {
  const navigate = useNavigate();
  const [gamecode, setGamecode] = useState("");
  const [goodCode, setGoodCode] = useState(false);
  const [wrongCode, setWrongCode] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);


  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  },[]);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);

  const showHosting = windowSize > 550 ? true : false;
  function joinGame() {
    checkIfGamecodeIsInDB(gamecode, setGoodCode, setWrongCode);
  }
  useEffect(() => {
    if (goodCode) {
      navigate(`/input-name/${gamecode}`, { state: gamecode });
    }
  }, [goodCode]);
  return (
    <>
      {showHosting && (
        <>
          <h1>Cacarrot</h1>
          <div className="paragraph">
            <Authorized
              isAuthorized={
                <button
                  className="my-button"
                  onClick={() => {
                    navigate("create");
                  }}
                >
                  Start your own Cacarrot
                </button>
              }
              notAuthorized={
                <>
                <div>
                <button
                  className="my-button"
                  onClick={() => {
                    localStorage.setItem('id', "examples")
                    navigate("create");
                  }}
                >
                  Start with example templates
                </button>
                </div>
                <div>
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/register")}>
                    Register
                  </button>
                  </div>
                </>
              }
            />
          </div>
        </>
      )}

      <div className="paragraph" style={{marginTop:'30px'}}>
        <div>Join game with code</div>
        <MyInput
          value={gamecode}
          setValue={setGamecode}
          placeholder={"Put in game code"}
          characterLimit={6}
          visibleWarning={false}
        />
        {wrongCode && <div className="error">{wrongCode}</div>}
        <button
          className="my-button"
          onClick={() => {
            joinGame();
          }}
        >
          Join
        </button>
      </div>
    </>
  );
}

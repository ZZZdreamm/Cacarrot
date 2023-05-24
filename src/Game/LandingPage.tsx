import { useNavigate } from "react-router-dom";
import Authorized from "../auth/Authorized";
import MyInput from "../Utilities/MyInput";
import { useEffect, useState } from "react";
import { checkIfGamecodeIsInDB } from "../FirebaseDatabase/FirebaseConfig";

export default function LandingPage() {
  const navigate = useNavigate();
  const [gamecode, setGamecode] = useState("");
  const [goodCode, setGoodCode] = useState(false);
  const [wrongCode, setWrongCode] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  },[]);

  useEffect(() => {
    console.log("asd");
    setWindowSize(window.innerWidth);
  }, [window.innerWidth]);

  const showHosting = windowSize > 550 ? true : false;
  function joinGame() {
    checkIfGamecodeIsInDB(gamecode, setGoodCode, setWrongCode);
  }
  useEffect(() => {
    if (goodCode) {
      navigate("/input-name", { state: gamecode });
    }
  }, [goodCode]);
  return (
    <>
      {/* // <main className="wrapper">
    //   <section className="landing-page"> */}
      {showHosting && (
        <>
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
                  <button onClick={() => navigate("/register")}>
                    Register
                  </button>
                </>
              }
            />
          </p>
        </>
      )}

      <p className="paragraph">
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
      </p>
      {/* //   </section>
    // </main> */}
    </>
  );
}

import { useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import routes, { guardedRoutes } from "./routes";
import { claim } from "./auth/auth.models";
import { getClaims } from "./auth/HandleJWT";
import AuthenticationContext from "./auth/AuthenticationContext";
import { ModalProvider } from "styled-react-modal";
import Menu from "./MainComponents/Menu";
import { IsOnline } from "./Utilities/IsOnline";
import OfflineWebsite from "./Utilities/OfflineWebsite";
import ChooseAbility from "./Game/ChooseAbility";
import GuardedRoute from "./Utilities/GuardedRoute";
import { io } from "socket.io-client";
import { serverURL } from "./apiPaths";
import SnowingEffect from "./Utilities/SnowingEffect";
import { Game } from "./Game/game.models";

export const socket = io(serverURL);

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  const [online, setOnline] = useState(true);
  const [gotClaims, setGotClaims] = useState(false);

  useEffect(() => {
    setClaims(getClaims());
    setOnline(navigator.onLine);
    IsOnline(setOnline);
  }, []);

  useEffect(() => {
    setClaims(getClaims());
    setGotClaims(true);
  }, [localStorage]);

  // const defaultGame: Game = {
  //   gameTemplate: {
  //     id: "",
  //     templateName: "",
  //     questionTime: 5,
  //     allQuestions: [],
  //   },
  //   players: [
  //     {
  //       id: 0,
  //       name: "Kacper",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "Megatron",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "asd",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "cas",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "rad",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "yar",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //     {
  //       id: 1,
  //       name: "mnat",
  //       points: 3000,
  //       answers: [],
  //       shownComponent: "",
  //       activeBonuses: [],
  //     },
  //   ],
  //   gamecode: "",
  //   started: "waiting",
  //   currentQuestion: 0,
  //   time: 5,
  //   gamePhase: 1,
  //   startingTime: 3,
  //   winners: [],
  //   hostConnection: true,
  //   hostId: "",
  // };
  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ModalProvider>
        <div className="App">
          <main className="wrapper">
            {online ? (
              <>
                <Menu />
                <SnowingEffect />
                <section className="landing-page">
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        Component={route.component}
                      />
                    ))}

                    {gotClaims &&
                      guardedRoutes.map((route) => (
                        <Route
                          key={route.path}
                          element={
                            <GuardedRoute isAuthenticated={claims.length > 0} />
                          }
                        >
                          <Route
                            Component={route.component}
                            path={route.path}
                          />
                        </Route>
                      ))}
                  </Routes>
                  {/* <ChooseAbility gameState={defaultGame} player={defaultGame.players[0]} setComponentState={()=>{}}/> */}
                </section>
              </>
            ) : (
              <OfflineWebsite />
            )}
          </main>
        </div>
      </ModalProvider>
    </AuthenticationContext.Provider>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { claim } from "./auth/auth.models";
import { getClaims } from "./auth/HandleJWT";
import AuthenticationContext from "./auth/AuthenticationContext";
import { ModalProvider } from "styled-react-modal";
import Menu from "./MainComponents/Menu";
import { IsOnline } from "./Utilities/IsOnline";
import OfflineWebsite from "./Utilities/OfflineWebsite";
import ChooseAbility from "./Game/ChooseAbility";

function App() {
  const [claims, setClaims] = useState<claim[]>([]);

  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine)
    IsOnline(setOnline);
  }, []);

  useEffect(() => {
    if (!online) {
      console.log("we ofline");
    }
  }, [online]);

  useEffect(() => {
    setClaims(getClaims());
  }, [localStorage]);


  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ModalProvider>
        <div className="App">
          <main className="wrapper">
            {online ? (
              <>
                <Menu />
                <section className="landing-page">
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        Component={route.component}
                      />
                    ))}
                  </Routes>
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

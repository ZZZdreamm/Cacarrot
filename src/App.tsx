import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import { claim } from "./auth/auth.models";
import { getClaims } from "./auth/HandleJWT";
import AuthenticationContext from "./auth/AuthenticationContext";
import { ModalProvider } from "styled-react-modal";
import Menu from "./components/Menu";
import UnloadPrompt from "./Utilities/UnloadPrompt";
import { leaveGame } from "./FirebaseDatabase/FirebaseConfig";

function App() {
  // const navigate = useNavigate();

  const [claims, setClaims] = useState<claim[]>([]);


  useEffect(() => {
    setClaims(getClaims());
  }, [localStorage]);


  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ModalProvider>
        <div className="App">
          <main className="wrapper">
            <Menu/>
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
          </main>
        </div>
      </ModalProvider>
    </AuthenticationContext.Provider>
  );
}

export default App;

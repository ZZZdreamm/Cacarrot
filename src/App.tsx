import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import routes from "./routes";
import { claim } from "./auth/auth.models";
import { getClaims } from "./auth/HandleJWT";
import AuthenticationContext from "./auth/AuthenticationContext";
import { ModalProvider } from "styled-react-modal";

function App() {
  const navigate = useNavigate();

  const [claims, setClaims] = useState<claim[]>([]);
  // const [profileDTO, setProfileDTO] = useState<profileDTO>({
  //   email: "",
  //   id: "",
  // });

  useEffect(() => {
    setClaims(getClaims());
    // setProfileDTO(getProfile());
  }, [localStorage]);

  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      {/* <ThemeProvider theme={theme}> */}
      <ModalProvider>
        <div className="App">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                Component={route.component}
              />
            ))}
          </Routes>
        </div>
      </ModalProvider>
    </AuthenticationContext.Provider>
  );
}

export default App;

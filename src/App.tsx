import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import routes from "./routes";
function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* <h1>Cacarrot</h1> */}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} Component={route.component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;

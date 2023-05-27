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
import { Socket } from "socket.io";
import { io } from "socket.io-client";

function App() {
  // const navigate = useNavigate();

  const [claims, setClaims] = useState<claim[]>([]);

  // const socket = io("https://cacarrot-server2.onrender.com')", {
  //   // withCredentials: true,
  //   // transports:['websocket'],
  //   extraHeaders: {
  //     "Access-Control-Allow-Origin": "http://localhost:3000",
  //   },
  // });

  useEffect(() => {
    setClaims(getClaims());
  }, [localStorage]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log("Connected to server");
    // });

    // socket.on("message", (message) => {
    //   console.log("Received message:", message);
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected from server");
    // });


    // fetch('https://cacarrot-server2.onrender.com', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   mode:'no-cors',
    //   body: JSON.stringify('HOLIBKA')
    // })
    //   .then(response => {
    //     // if (!response.ok) {
    //     //   throw new Error('Request failed');
    //     // }
    //     // return response.json();
    //     console.log(response)
    //   })

    // return () => {
    //   socket.disconnect(); // Clean up the socket connection when the component unmounts
    // };





  }, []);



  // const sendMessage = () => {
  //   const message = "Hello from the client!"; // Replace with your desired message
  //   socket.emit("message", message);
  // };

  return (
    <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
      <ModalProvider>
        <div className="App">
          <main className="wrapper">
            <Menu />
            {/* <button onClick={()=>{}}>Emit message</button> */}
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

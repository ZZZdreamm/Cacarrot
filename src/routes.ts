import CreateGame from "./Game/CreateGame";
import CreateTemplate from "./GameTemplate/CreateTemplate";
import EditTemplate from "./GameTemplate/EditTemplate";
import GameHost from "./Game/GameHost";
import GamePlayer from "./Game/GamePlayer";
import Gamecode from "./Game/Gamecode";
import InputName from "./Game/InputName";
import LandingPage from "./MainComponents/LandingPage";
import WaitingRoom from "./Game/WaitingRoom";
import Login from "./auth/Login";
import Register from "./auth/Register";

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  { path: "create", component: CreateGame },
  { path: "create-template", component: CreateTemplate },
  { path: "/edit-template", component: EditTemplate },
  
  { path: "/waiting-room/:code", component: WaitingRoom },
  { path: "/input-name/:code", component: InputName },
  { path: "/game-code/:code", component: Gamecode },
  { path: "/game-host/:code", component: GameHost },
  { path: "/game-player/:code", component: GamePlayer },

  { path: "/", component: LandingPage },
  { path: "*", component: LandingPage },
];

export const guardedRoutes = [


];

export default routes;

import CreateGame from "./Game/CreateGame"
import CreateTemplate from "./Game/CreateTemplate"
import EditTemplate from "./Game/EditTemplate"
import GameHost from "./Game/GameHost"
import GamePlayer from "./Game/GamePlayer"
import Gamecode from "./Game/Gamecode"
import InputName from "./Game/InputName"
import LandingPage from "./Game/LandingPage"
import WaitingRoom from "./Game/WaitingRoom"
import Login from "./auth/Login"
import Register from "./auth/Register"

const routes = [
    {path:'create', component:CreateGame},
    {path:'create-template', component:CreateTemplate},
    {path:'/edit-template', component:EditTemplate},
    {path:'/login', component:Login},
    {path:'/register', component:Register},
    {path:'/game-code', component:Gamecode},
    {path:'/game-host/:code', component:GameHost},
    {path:'/waiting-room', component:WaitingRoom},
    {path:'/game-player/:code', component:GamePlayer},
    {path:'/input-name', component:InputName},

    {path:'/', component:LandingPage},
    {path:'*', component:LandingPage},

]

export default routes
import CreateGame from "./Game/CreateGame"
import CreateTemplate from "./Game/CreateTemplate"
import GameHost from "./Game/GameHost"
import GamePlayer from "./Game/GamePlayer"
import Gamecode from "./Game/Gamecode"
import LandingPage from "./Game/LandingPage"
import Login from "./auth/Login"
import Register from "./auth/Register"

const routes = [
    {path:'create', component:CreateGame},
    {path:'create-template', component:CreateTemplate},
    {path:'/login', component:Login},
    {path:'/register', component:Register},
    {path:'/game-code', component:Gamecode},
    {path:'/game-host', component:GameHost},
    {path:'/game-player', component:GamePlayer},
    {path:'/', component:LandingPage},
    {path:'*', component:LandingPage},

]

export default routes
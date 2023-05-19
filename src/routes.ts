import CreateGame from "./Game/CreateGame"
import CreateTemplate from "./Game/CreateTemplate"
import LandingPage from "./Game/LandingPage"

const routes = [
    {path:'create', component:CreateGame},
    {path:'create-template', component:CreateTemplate},
    {path:'/', component:LandingPage},
    {path:'*', component:LandingPage},

]

export default routes
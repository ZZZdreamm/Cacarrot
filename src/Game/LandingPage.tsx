import { useNavigate } from "react-router-dom"

export default function LandingPage(){
    const navigate = useNavigate()
    return(
        <main className="wrapper">
            {/* <section className="landing-page"> */}
            <h1>Cacarrot</h1>
            <p className="paragraph"><button className="my-button" onClick={()=>{navigate('create')}}>Create your own Cacarrot</button></p>
            <p className="paragraph"><div>Join game with code</div><input className="my-input" placeholder="Put in game code"/><button className="my-button">Join</button></p>
            {/* </section> */}
        </main>
    )
}
import { useEffect } from "react"

//@ts-ignore
export default function Timer({time, setTime, bonusStyling}){
    useEffect(()=>{
        const intervalId = setInterval(() => {
            if (time > 0) {
              setTime((timee:any) => timee - 1);
            }
          }, 1000);
          return () => clearInterval(intervalId);
    },[time])
    return(
        <div className="timer" style={bonusStyling}>
           <span style={{fontSize:'2.5em'}}>{time}</span>
        </div>
    )
}
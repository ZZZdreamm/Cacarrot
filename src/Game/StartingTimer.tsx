import { useEffect } from "react"

//@ts-ignore
export default function StartingTimer({time, setTime, bonusStyling} : StartingTimeProps){
    useEffect(()=>{
        const intervalId = setInterval(() => {
            if (time > 0) {
              setTime((timee:number) => timee - 1);
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

interface StartingTimeProps{
  time:number;
  setTime:(time:any) => void;
  bonusStyling?:any
}
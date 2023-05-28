import { useEffect } from "react"

//@ts-ignore
export default function StartingTimer({time, setTime}){
    useEffect(()=>{
        const intervalId = setInterval(() => {
            if (time > 0) {
              setTime((timee:any) => timee - 1);
            }
          }, 1000);
          return () => clearInterval(intervalId);
    },[time])
    return(
        <div className="timer" style={{marginTop:'0'}}>
           <span style={{fontSize:'2.5em'}}>{time}</span>
        </div>
    )
}
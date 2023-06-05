import { useEffect, useState } from "react";
import GameAbandoned from "../Game/GameAbandoned";
import StartingTimer from "../Game/StartingTimer";
import { ReadyImagesURL } from "../appUrls";

//@ts-ignore
export default function Waiting({
  message,
  time,
  setTime,
}: StartingTimerProps) {
  const [waiting, setWaiting] = useState(true)
  useEffect(()=>{
    localStorage.setItem('time', `${time!}`)
    if(time! < 1 && waiting){
        setWaiting(false)
    }
  },[time])
  return (
    <>
      {waiting ? (
        <>
          <img
            src={`${ReadyImagesURL}/loading.gif`}
            style={{ height: "30rem", width: "30rem" }}
          />
          <h1>{message}</h1>
          <StartingTimer
            time={time!}
            setTime={setTime!}
            bonusStyling={{ display: "none" }}
          />
        </>
      ) : (
        <GameAbandoned />
      )}
    </>
  );
}

interface StartingTimerProps {
  message:string;
  time?: number;
  setTime?: (time: number) => void;
}

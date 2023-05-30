import React, { useEffect } from "react";
import { gamesRef } from "../FirebaseDatabase/FirebaseConfig";

const UnloadPrompt = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ""; // This is necessary for Chrome
    };
    window.addEventListener("beforeunload", handleBeforeUnload);


    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default UnloadPrompt;

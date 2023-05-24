import React, { useEffect } from "react";

const UnloadPrompt = (handleLeaveWebsite:any) => {
  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = ""; // This is necessary for Chrome


      const confirmationMessage = 'Are you sure you want to leave?'; // Custom message

      // Display the custom alert message
      if (confirmationMessage) {
        event.returnValue = confirmationMessage;
      }

        // handleLeaveWebsite();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);


    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

export default UnloadPrompt;

import { onDisconnect, onValue, ref, set } from "firebase/database";
import { connectedRef } from "../FirebaseDatabase/FirebaseConfig";

export const IfConnected = (setConnected: any) => {
    onValue(connectedRef, (snap) => {
        console.log(snap.val())
        if (snap.val() === true) {
            setConnected(true);
            console.log("connected");
        } else {
            setConnected(false);
            console.log("not connected");
        }
    })
}

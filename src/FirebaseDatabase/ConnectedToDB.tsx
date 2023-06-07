import { onDisconnect, onValue, ref, set } from "firebase/database";
import { db, dbRef, gamesRef, connectedRef } from "./FirebaseConfig";

export const HostConnection = (gamecode: string) => {
    gamesRef.child(gamecode).child('hostConnection').onDisconnect().set(false)
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            gamesRef.child(gamecode).child('hostConnection').set(true)
        } else {
            gamesRef.child(gamecode).child('hostConnection').set(false)
        }
    })
}



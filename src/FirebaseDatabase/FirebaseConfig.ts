import firebase from "firebase/compat/app";
import "firebase/compat/database";
// import { initializeApp } from "firebase/app";
// import "firebase/database";
import { GameTemplate } from "../Game/game.models";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDusTR62nXSXyjblgvFNIFGepxtzYxHVF8",
  authDomain: "kakoot-d06ff.firebaseapp.com",
  databaseURL: "https://kakoot-d06ff-default-rtdb.firebaseio.com",
  projectId: "kakoot-d06ff",
  storageBucket: "kakoot-d06ff.appspot.com",
  messagingSenderId: "594818848188",
  appId: "1:594818848188:web:331461933f89b9bcb707b9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//@ts-ignore
const dbRef = firebase.database().ref()
const usersRef = dbRef.child('users')


export function saveTemplate(username:string, game:GameTemplate){
    usersRef.child(username).child('templates').push(game)
}

export async function checkIfUserInDB(
    username: string,
    password: string,
    callback: any
  ) {
    await usersRef.get().then((querySnapshot) => {
      const users = querySnapshot.val();
      Object.entries(users).forEach((user: any) => {
        var value = user[1];
        if (value.username == username && value.password == password) {
          callback(value.username);
        }
      });
    });
  }

  export function registerUserInDB(username: string, password: string) {
    usersRef.push({ username: username, password: password });
  }
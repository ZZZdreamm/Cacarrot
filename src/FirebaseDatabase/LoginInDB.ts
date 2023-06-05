import { uuidv4 } from "../GameTemplate/TemplateFunctions";
import { dbRef } from "./FirebaseConfig";

export async function loginInDB(username:string, password:string){
    let name = ''
    await dbRef.child('usersAccounts').once('value', (snapshot) => {
        const userAccounts = snapshot.val()
        Object.values(userAccounts).forEach((user:any)=>{
            if(user.username == username && user.password == password){
                name = username
                return username
            }
        })
    })
    return name
}

export async function registerInDb(username:string, password:string) {
    let name = username
    await dbRef.child('usersAccounts').once('value', (snapshot) => {
        const userAccounts = snapshot.val()
        if(userAccounts){
            Object.values(userAccounts).forEach((user:any)=>{
                if(user.username == username){
                    name = ''
                    return null
                }
            })
        }
    })
    if(name){
        localStorage.setItem('username', username)
        dbRef.child('usersAccounts').push({username, password})
        return name
    }
}
import { GameTemplate } from "../Game/game.models"
import { usersRef } from "./FirebaseConfig"

export async function saveTemplateInDB(userId:string, gameTemplate:GameTemplate){
    await usersRef.child(userId).child('templates').child(gameTemplate.templateName).set(gameTemplate)
}

export async function getUserTemplates(userId:string, callback:any){
  await usersRef.child(userId).child('templates').once('value', (snapshot) => {
    const userData = snapshot.val()
    let templates : GameTemplate[] = []
    Object.values(userData).forEach((value : any) => {
      const {allQuestions, id, questionTime, templateName} = value??{}
      const template : GameTemplate = {
        allQuestions:allQuestions,
        id:id,
        questionTime:questionTime,
        templateName:templateName
      }
      templates.push(template)
    })
    callback(templates)
  }, (error) =>{
    console.error('Error retrieving data ', error)
  })
}
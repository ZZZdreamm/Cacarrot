import { Console } from "console";
import { GameTemplate } from "../Game/game.models";
import { usersRef } from "./FirebaseConfig";

export async function saveTemplateInDB(
  userId: string,
  gameTemplate: GameTemplate
) {
  await usersRef
    .child(userId)
    .child("templates")
    .child(gameTemplate.id)
    .set(gameTemplate);
}

export async function getUserTemplates(userId: string, callback: any) {
  await usersRef.once("value", (snapshot) => {
    const userIds = snapshot.val();
    Object.keys(userIds).forEach((id: string) => {
      if (id == userId) {
        usersRef
          .child(userId)
          .child("templates")
          .once(
            "value",
            (snapshot) => {
              const userData = snapshot.val();
              let templates: GameTemplate[] = [];
              if (userData) {
                Object.values(userData).forEach((value: any) => {
                  const { allQuestions, id, questionTime, templateName } =
                    value ?? {};
                  const template: GameTemplate = {
                    allQuestions: allQuestions,
                    id: id,
                    questionTime: questionTime,
                    templateName: templateName,
                  };
                  templates.push(template);
                });
              }
              callback(templates);
            },
            (error) => {
              console.error("Error retrieving data ", error);
            }
          );
      }
    });
  });
}

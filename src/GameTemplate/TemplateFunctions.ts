import { GameTemplate } from "../Game/game.models";
import { Question } from "./questions.models";
import { saveTemplateInDB } from "../FirebaseDatabase/TemplatesInDB";


export let uuidv4 = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export function saveTemplate(
  questions: Question[],
  templateName: string,
  questionTime: number,
  gameId?: string
) {
  const userId = localStorage.getItem("id")
  let validQuestions: Question[] = [];
  questions.forEach((question: Question) => {
    if (validateQuestion(question)) {
      validQuestions.push(question);
    }
  });
  const newGameTemplate: GameTemplate = {
    id: gameId ? gameId : uuidv4(),
    templateName: templateName,
    allQuestions: validQuestions,
    questionTime: questionTime,
  };
  if (validQuestions.length < 1) {
    return false
  } else {
    saveTemplateInDB(userId!, newGameTemplate);
    return true
  }
}

function validateQuestion(question: Question) {
  if (
    question.answerA &&
    question.answerB &&
    question.answerC &&
    question.answerD &&
    question.question &&
    question.correctAnswer
  ) {
    return true;
  }
  return false;
}

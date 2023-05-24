import { Question } from "../Questions/questions.models";

export interface Game{
    gameTemplate:GameTemplate;
    players:Player[];
    gamecode:string;
    started:string;
    currentQuestion:number;
}

export interface GameTemplate{
    id:string;
    templateName:string;
    allQuestions:Question[];
    questionTime:number;
}

export interface Player{
    id:number;
    name:string;
    points:number;
    lastAnswer:Answer;
}
export interface Answer{
    choosenAnswer:string;
    sendingTime:number;
    questionNumber:number;
}
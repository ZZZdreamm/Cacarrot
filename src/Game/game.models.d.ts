import { Question } from "../Questions/questions.models";

export interface Game{
    gameTemplate:GameTemplate;
    players:Player[];
    gamecode:string;
}

export interface GameTemplate{
    id:number
    templateName:string;
    allQuestions:Question[];
    questionTime:number;
}

export interface Player{
    id:number;
    name:string;
    points:number;
}
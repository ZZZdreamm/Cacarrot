import { Question } from "../GameTemplate/questions.models";

export interface Game{
    gameTemplate:GameTemplate;
    players:Player[];
    gamecode:string;
    started:string;
    currentQuestion:number;
    time:number;
    gamePhase:number;
    startingTime:number;
    winners:Player[];
    hostConnection:boolean;
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
    shownComponent:string;
    activeBonuses?:string[];
}
export interface Answer{
    choosenAnswer:string;
    sendingTime:number;
    questionNumber:number;
}

export interface Ability{
    name:string;
    cost:number;
    onChoose:any;
    representingImage:string;
    explanation:string;
}
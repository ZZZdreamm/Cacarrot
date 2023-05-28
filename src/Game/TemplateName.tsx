import { GameTemplate } from "./game.models"

export default function TemplateName({template, templateIndex, chooseTemplate, choosenTemplate}:TemplateNameProps){
    const templateColored = choosenTemplate && template.id === choosenTemplate.id ? '#c4c1e0' : 'inherit'
    return(
        <p
        style={{backgroundColor:templateColored}}
         className="template-name" onClick={()=>{chooseTemplate(templateIndex)}}>{templateIndex}. {template.templateName}</p>
    )
}

interface TemplateNameProps{
    template:GameTemplate;
    templateIndex:number;
    chooseTemplate:(templateNumber:number) => void;
    choosenTemplate:GameTemplate;
}
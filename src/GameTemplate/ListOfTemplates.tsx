import TemplateName from "../Game/TemplateName";
import { GameTemplate } from "../Game/game.models";

export default function ListOfTemplates({ templates, chooseTemplate, choosenTemplate }: ListOfTemplatesProps) {
  return (
    <div className="list-container">
        <h2 style={{textAlign:'center'}}>Templates</h2>
      {templates.map((template, index) => (
        <TemplateName key={index} template={template} templateIndex={index+1} chooseTemplate={chooseTemplate} choosenTemplate={choosenTemplate}/>
      ))}
    </div>
  );
}
interface ListOfTemplatesProps {
  templates: GameTemplate[];
  chooseTemplate:any;
  choosenTemplate:GameTemplate;
}

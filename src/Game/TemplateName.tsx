//@ts-ignore
export default function TemplateName({template, templateIndex, chooseTemplate, choosenTemplate}){
    const templateColored = template.id === choosenTemplate.id ? '#c4c1e0' : 'inherit'
    return(
        <p
        style={{backgroundColor:templateColored}}
         className="template-name" onClick={()=>{chooseTemplate(templateIndex)}}>{templateIndex}. {template.templateName}</p>
    )
}
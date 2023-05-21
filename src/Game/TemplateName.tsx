//@ts-ignore
export default function TemplateName({template, templateIndex, chooseTemplate, choosenTemplate}){
    const templateColored = templateIndex == choosenTemplate.id ? '#c4c1e0' : 'inherit'
    // console.log(templateIndex)
    // console.log(choosenTemplate)
    return(
        <p style={{backgroundColor:templateColored}} className="template-name" onClick={()=>{chooseTemplate(templateIndex)}}>{templateIndex}. {template.templateName}</p>
    )
}
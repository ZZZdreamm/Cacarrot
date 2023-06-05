import { useNavigate } from "react-router-dom";
import MyModal from "../Utilities/Modal";
import { useEffect, useState } from "react";
import ListOfTemplates from "../GameTemplate/ListOfTemplates";
import { GameTemplate } from "./game.models";
import { getUserTemplates } from "../FirebaseDatabase/TemplatesInDB";

export default function CreateGame() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false)

  function toggleModal(e: any, isOpen:any, setIsOpen:any) {
    setIsOpen(!isOpen);
  }
  const [templates, setTemplates] = useState<GameTemplate[]>([]);

  useEffect(()=>{
    const userId = localStorage.getItem("id")
    getUserTemplates(userId!, setTemplates)
  },[])


  useEffect(()=>{
    setChoosenTemplate(templates[0])
  },[templates])

  const [choosenTemplate, setChoosenTemplate] = useState(templates[0]);
  function chooseTemplate(templateId: number) {
    setChoosenTemplate(templates[templateId - 1]);
  }
  function generateCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
      var randomNumber = randomNumberInRange(0, 9)
      code += `${randomNumber}`
    }
    return code
  }

  function randomNumberInRange(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const noTemplates = !choosenTemplate ? true : false
  return (
    <>
      <section className="flex-section">
        <article className="half-article">
          <button
            className="my-button"
            onClick={(e:any)=>{toggleModal(e, isOpen, setIsOpen)}}
            style={{ height: "100%", aspectRatio:'1'}}
          >
            Choose game template
          </button>
          <MyModal
            isOpen={isOpen}
            toggleModal={(e:any)=>{toggleModal(e, isOpen, setIsOpen)}}
            children={
              <>
                <ListOfTemplates
                  templates={templates}
                  chooseTemplate={chooseTemplate}
                  choosenTemplate={choosenTemplate}
                />
              </>
            }
            disableSubmit={noTemplates}
            submitButtonText={"Choose"}
            onSubmit={() => {
              const gameProps = {
                template: choosenTemplate,
                gamecode: generateCode(),
              };
              navigate("/game-code", { state: gameProps });
              localStorage.setItem(
                "gameTemplate",
                JSON.stringify(choosenTemplate)
              );
            }}
          />
        </article>
        <article className="half-article">
          <button
            className="my-button"
            onClick={(e:any)=>{toggleModal(e, isOpen2, setIsOpen2)}}
            style={{ height: "100%", aspectRatio:'1' }}
          >
            Edit game templates
          </button>
          <MyModal
            isOpen={isOpen2}
            toggleModal={(e:any)=>{toggleModal(e, isOpen2, setIsOpen2)}}
            children={
              <>
                <ListOfTemplates
                  templates={templates}
                  chooseTemplate={chooseTemplate}
                  choosenTemplate={choosenTemplate}
                />
              </>
            }
            disableSubmit={noTemplates}
            submitButtonText={"Choose"}
            onSubmit={() => {
              navigate("/edit-template", { state: choosenTemplate });
            }}
          />
        </article>
        <article className="half-article">
          <button
            className="my-button"
            onClick={() => {
              navigate("/create-template");
            }}
            style={{ height: "100%", aspectRatio:'1'  }}
          >
            Create new game template
          </button>
        </article>
      </section>
    </>
  );
}

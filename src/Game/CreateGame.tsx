import { useNavigate } from "react-router-dom";
import Modal from "styled-react-modal";
import FancyModalButton from "../Utilities/Modal";
import MyModal from "../Utilities/Modal";
import { useState } from "react";
import ListOfTemplates from "./ListOfTemplates";
import { GameTemplate } from "./game.models";

export default function CreateGame() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e: any) {
    setIsOpen(!isOpen);
  }
  const [templates, setTemplates] = useState<GameTemplate[]>([
    { id: 1, allQuestions: [], questionTime: 10, templateName: "arka" },
    { id: 2, allQuestions: [], questionTime: 10, templateName: "wodka" },
    { id: 3, allQuestions: [], questionTime: 10, templateName: "czysta" },
    { id: 4, allQuestions: [], questionTime: 10, templateName: "czysta2" },
    { id: 5, allQuestions: [], questionTime: 10, templateName: "czysta3" },
    {
      id: 6,
      allQuestions: [
        {
          questionNumber: 1,
          question: "Czy Ala ma kota?",
          answerA: "ma",
          answerB: "nie ma",
          answerC: "nie wiadomo",
          answerD: "kot nie istnieje",
          correctAnswer: "A",
        },
        {
          questionNumber: 2,
          question: "Czy Ala nie ma kota?",
          answerA: "ma",
          answerB: "nie ma",
          answerC: "nie wiadomo",
          answerD: "kot nie istnieje",
          correctAnswer: "A",
        },
      ],
      questionTime: 5,
      templateName: "czysta4",
    },
  ]);

  const [choosenTemplate, setChoosenTemplate] = useState(templates[0]);
  function chooseTemplate(templateId: number) {
    setChoosenTemplate(templates[templateId - 1]);
  }

  return (
    <>
    {/* // <main className="wrapper">
    //   <section className="landing-page"> */}
        <section className="flex-section">
          <article className="half-article">
            {/* <p className="paragraph">Choose game template</p> */}
            <button className="my-button" onClick={toggleModal}>
              Choose game template
            </button>
            <MyModal
              isOpen={isOpen}
              toggleModal={toggleModal}
              children={
                <>
                  <ListOfTemplates
                    templates={templates}
                    chooseTemplate={chooseTemplate}
                    choosenTemplate={choosenTemplate}
                  />
                </>
              }
              submitButtonText={"Choose"}
              onSubmit={() => {
                const gameProps = {
                  template: choosenTemplate,
                  gamecode: "000000",
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
            {/* <p className="paragraph">Create new game template</p> */}
            <button
              className="my-button"
              onClick={() => {
                navigate("/create-template");
              }}
            >
              Create new game template
            </button>
          </article>
        </section>
    {/* //   </section>
    // </main> */}
    </>
  );
}

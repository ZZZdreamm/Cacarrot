import { useNavigate } from "react-router-dom";

export default function CreateGame() {
  const navigate = useNavigate();
  return (
    <main className="wrapper">
      <section className="flex-section">
        <article className="half-article">
          {/* <p className="paragraph">Choose game template</p> */}
          <button className="my-button">Choose game template</button>
        </article>
        <article className="half-article">
          {/* <p className="paragraph">Create new game template</p> */}
          <button className="my-button" onClick={()=>{
            navigate('/create-template')
          }}>Create new game template</button>
        </article>
      </section>
    </main>
  );
}

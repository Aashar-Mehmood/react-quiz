export default function Intro(props) {
  return (
    <div className="intro">
      <h1>Quizzical</h1>
      <p>Some description about quiz</p>
      <button className="btn primary" onClick={props.clickHandler}>
        Start Quiz
      </button>
    </div>
  );
}

import blue_blob from "../images/intro_page_b1.png";
import pink_blob from "../images/intro_page_b2.png";
import { useState } from "react";
import Intro from "./Intro";
import Quiz from "./Quiz";

export default function Main() {
  const [startQuiz, setStartQuiz] = useState(false);
  function handleClick() {
    setStartQuiz(true);
  }
  return (
    <div className="container">
      {!startQuiz ? <Intro clickHandler={handleClick} /> : <Quiz />}

      <img src={pink_blob} alt="Pink blob" className="pink_blob" />
      <img src={blue_blob} alt="Blue blob" className="blue_blob" />
    </div>
  );
}

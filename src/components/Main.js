import blue_blob from "../images/intro_page_b1.png";
import pink_blob from "../images/intro_page_b2.png";
import { useState } from "react";
import Intro from "./Intro";
import Quiz from "./Quiz";

export default function Main() {

  const [apiParameters, setApiParameters] = useState({
    amount:5,
    category:"any",
    difficulty:"any"
  });

  function handleChange(e){
    const {name, value} = e.target;
    setApiParameters((prevParamteres)=>{
      return{
        ... prevParamteres,
        [name] : value
      }
    })
  }


  const [startQuiz, setStartQuiz] = useState(false);

  function handleClick() {
    setStartQuiz(prevState=>!prevState);
  }

  return (

    <div className="container">
      {
      !startQuiz
      ? <Intro {... apiParameters} changeHandler={handleChange} clickHandler={handleClick} /> 
      : <Quiz {... apiParameters} restartQuizHandler={handleClick} />
      }

      <img src={pink_blob} alt="Pink blob" className="pink_blob" />
      <img src={blue_blob} alt="Blue blob" className="blue_blob" />
    </div>
  );
}

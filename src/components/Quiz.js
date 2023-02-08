import Question from "./Question";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

export default function Quiz(props) {
  const {amount, category, difficulty, restartQuizHandler} = props;
  const [questions, setQuestions] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [answersAreChecked, setAnswersAreChecked] = useState(false);

  function getOptionObject(allOptions) {
    return allOptions
      .map((option, index) => {
        return {
          id: nanoid(10),
          value: option,
          isSelected: false,
          isCorrect: index === allOptions.length - 1 ? true : false,
        };
      })
      .sort((opt1, opt2) => {
        let l1 = opt1.value.length;
        let l2 = opt2.value.length;
        if (l1 > l2) {
          return 1;
        } else if (l2 > l1) {
          return -1;
        } else {
          return 0;
        }
      });
  }

  useEffect(() => {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    if(category!=="any"){
      url +=`&category=${category}`
    }
    if(difficulty!=="any"){
      url +=`&difficulty=${difficulty}`
    }
    url += "&type=multiple";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.results.map((quest) => {
            var { question, incorrect_answers, correct_answer } = quest;
            return {
              id: nanoid(10),
              question: question,
              options: getOptionObject(
                incorrect_answers.concat(correct_answer)
              ),
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    setAllSelected(() => {
      return questions.every((question) => {
        return question.options.some((option) => option.isSelected);
      });
    });
  }, [questions]);

  function checkAnswers() {
    setAnswersAreChecked(true);
    questions.forEach((question) => {
      question.options.forEach((option) => {
        if (option.isSelected && option.isCorrect) {
          setTotalCorrect((prevCorrect) => prevCorrect + 1);
        }
      });
    });
  }

  function resetQuiz() {
    restartQuizHandler();
    setAllSelected(false);
    setTotalCorrect(0);
    setAnswersAreChecked(false);
  }

  function changeIsSelected(questionId, optionId) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option) => {
              return option.id === optionId
                ? { ...option, isSelected: !option.isSelected }
                : { ...option, isSelected: false };
            }),
          };
        } else {
          return question;
        }
      });
    });
  }
  return (
    <div className="quiz">
      {questions.map((quest) => {
        return (
          <div key={nanoid(10)}>
            <Question
              answersChecked={answersAreChecked}
              {...quest}
              handleClick={(e) => changeIsSelected(quest.id, e.target.id)}
            />
            <div className="line"></div>
          </div>
        );
      })}
      <div className="result">
        {answersAreChecked && (
          <p>You Scored {totalCorrect}/5 correct answers</p>
        )}
        <button
          onClick={() => {
            if (answersAreChecked) {
              resetQuiz();
            } else if (!answersAreChecked && allSelected) {
              checkAnswers();
            }
          }}
          className="btn primary"
        >
          {answersAreChecked ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </div>
  );
}

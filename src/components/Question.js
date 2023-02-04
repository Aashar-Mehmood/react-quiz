import { nanoid } from "nanoid";
export default function Question(props) {
  const { question, options, handleClick, answersChecked } = props;
  return (
    <div className="question">
      <h2>
        {question
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&amp;/g, "&")}
      </h2>

      <div className="options">
        {options.map((option) => {
          var classNames = "btn ";
          if (option.isSelected) {
            classNames += "selected ";
            if (answersChecked && option.isCorrect) {
              classNames += "correct ";
            } else if (answersChecked && !option.isCorrect) {
              classNames += "wrong ";
            }
          } else if (!option.isSelected && answersChecked && option.isCorrect) {
            classNames += "correct ";
          } else {
            classNames += "";
          }
          return (
            <button
              className={classNames}
              id={option.id}
              key={nanoid(10)}
              onClick={handleClick}
            >
              {option.value
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, "&")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

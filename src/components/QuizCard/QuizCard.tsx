import { AnswerItem, OptionItem } from "../../types/quiz.types";
import CorrectOption from "../CorrectOption/CorrectOption";
import styles from "./QuizCard.module.css";

type QuizCardParams = {
  questionId: string | undefined;
  question: string;
  options: OptionItem[];
  result: { score: number; answers: AnswerItem[] };
};

const QuizCard = ({
  questionId,
  question,
  options,
  result,
}: QuizCardParams) => {
  return (
    <>
      <div className={styles.question}>{question}</div>
      <div className={styles.optionContainer}>
        {options.map((option) => (
          <CorrectOption
            key={option._id}
            questionId={questionId}
            option={option}
            result={result}
          />
        ))}
      </div>
    </>
  );
};

export default QuizCard;

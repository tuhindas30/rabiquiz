import { Button } from "react-bootstrap";
import { useQuiz } from "../../contexts/QuizProvider";
import { AnswerItem, OptionItem } from "../../types/quiz.types";
import styles from "./CorrectOption.module.css";

type CorrectOptionParams = {
  questionId: string | undefined;
  option: OptionItem;
  result: { score: number; answers: AnswerItem[] };
};

const CorrectOption = ({ questionId, option, result }: CorrectOptionParams) => {
  const { selectedOptions } = useQuiz().quizState;

  const answerObj = result.answers.find((item) => item.question === questionId);

  const userSelectedOption = selectedOptions.answers.find(
    (item) => item.questionId === questionId
  );

  const renderOptionStyle = (optionId: string | undefined) => {
    if (optionId === answerObj?.answer) {
      return "correctOptionStyle";
    } else if (optionId === userSelectedOption?.optionId) {
      return "inCorrectOptionStyle";
    }
    return "defaultOptionStyle";
  };

  return (
    <Button
      block
      className={`${styles[renderOptionStyle(option._id)]} ${
        styles.optionButton
      }`}>
      {option.label}
    </Button>
  );
};

export default CorrectOption;

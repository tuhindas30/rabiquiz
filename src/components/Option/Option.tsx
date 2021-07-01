import { useState } from "react";
import { Button } from "react-bootstrap";
import { OptionItem } from "../../types/quiz.types";
import { useQuiz } from "../../contexts/QuizProvider";
import styles from "./Option.module.css";

type OptionParams = {
  option: OptionItem;
  onOptionClick: (option: OptionItem) => void;
};

const Option = ({ option, onOptionClick }: OptionParams) => {
  const [isOptionSelected, setOptionSelected] = useState(false);
  const { isOptionDisabled } = useQuiz().quizState;

  const handleOptionStyle = (option: OptionItem) => {
    setOptionSelected(true);
    onOptionClick(option);
  };

  const renderAnswerStyle = (isOptionSelected: boolean, option: OptionItem) => {
    if (!isOptionSelected) return "defaultOptionStyle";
    return option.isCorrect ? "correctOptionStyle" : "inCorrectOptionStyle";
  };

  return (
    <Button
      block
      onClick={() => handleOptionStyle(option)}
      className={`${styles.optionButton} ${
        styles[renderAnswerStyle(isOptionSelected, option)]
      } ${isOptionDisabled ? styles.notAllowed : styles.pointer}`}
      disabled={isOptionDisabled}>
      {option.label}
    </Button>
  );
};

export default Option;

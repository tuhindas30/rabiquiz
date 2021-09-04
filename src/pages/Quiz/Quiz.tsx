import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { OptionItem } from "../../types/quiz.types";
import { useQuiz } from "../../contexts/QuizProvider";
import Option from "../../components/Option/Option";
import showToast from "../../utils/showToast";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { ReactComponent as EmptyQuizImage } from "../../assets/images/EmptyQuizImage.svg";
import { ReactComponent as CheckmarkImage } from "../../assets/images/CheckmarkImage.svg";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const {
    loading,
    questions,
    options,
    currentQuestionNumber,
    counter,
    questionId,
    score,
  } = useQuiz().quizState;

  const {
    increaseScore,
    changeQuestionOnOptionClick,
    changeQuestion,
    resetQuiz,
    resetCountDown,
    setQuestionId,
    triggerCountDown,
  } = useQuiz();

  const { id } = useParams();

  const currentQuizQuestions = questions.find(
    (question) => question.category === id
  ) ?? { category: "", questions: [] };

  const currentQuizOptions = options.find(
    (option) => option.category === id
  ) ?? { category: "", items: [] };

  const totalQuizQuestions = currentQuizQuestions.questions.length ?? 0;

  const currentQuestion =
    currentQuizQuestions.questions[currentQuestionNumber - 1];

  const currentOptions = currentQuizOptions.items.find(
    (item) => item?.question === questionId
  );

  const correctOption = currentOptions?.options.find(
    (option) => option.isCorrect
  )?.label;

  useEffect(() => {
    resetCountDown();
    resetQuiz();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuestionId(currentQuestion?._id);
  }, [currentQuestion?._id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter === 0) {
        return changeQuestion(currentQuestionNumber);
      }
      return triggerCountDown();
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionNumber, counter]);

  type OptionObj = {
    currentQuestionNumber: number;
    correctOption: string | undefined;
    points: number;
    option: OptionItem;
  };

  const handleOptionClick = (optionObj: OptionObj) => {
    const { currentQuestionNumber, correctOption, points, option } = optionObj;
    if (option.isCorrect) {
      increaseScore(points);
    } else {
      showToast(`Correct option: ${correctOption}`);
    }
    changeQuestionOnOptionClick(currentQuestionNumber);
  };

  const handlePlayAgainButton = () => {
    resetQuiz();
    resetCountDown();
  };

  if (loading) {
    return (
      <Container className={styles.header} style={{ height: "88vh" }}>
        <Loader />
      </Container>
    );
  }

  if (
    questions.length === 0 ||
    options.length === 0 ||
    totalQuizQuestions === 0
  ) {
    return (
      <div className={styles.emptyQuizContainer}>
        <EmptyQuizImage width="80%" />
        <p className={styles.message}>
          Missing quiz data! Try refreshing the page :)
        </p>
      </div>
    );
  }

  if (currentQuestionNumber <= totalQuizQuestions) {
    return (
      <Container className={styles.container}>
        <ToastContainer />
        <div className={styles.header}>
          <div>
            Question: {currentQuestionNumber}/{totalQuizQuestions}
          </div>
          <div>Timer: {counter}/30</div>
        </div>
        <div className={styles.question}>{currentQuestion?.label}</div>
        <div className={styles.optionContainer}>
          {currentOptions?.options.map((option) => (
            <Option
              key={option._id}
              option={option}
              onOptionClick={() =>
                handleOptionClick({
                  currentQuestionNumber,
                  correctOption,
                  points: currentQuestion.points,
                  option,
                })
              }
            />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => changeQuestion(currentQuestionNumber)}
            className="button">
            {currentQuestionNumber === totalQuizQuestions
              ? "View Score"
              : "Skip"}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className={`${styles.container} ${styles.scoreContainer}`}>
      <CheckmarkImage className={styles.checkmark} />
      <div className={styles.score}>Score: {score}</div>
      <div className={styles.scoreButtonContainer}>
        <Link to="/">
          <Button className={`button ${styles.button}`}>Return to Home</Button>
        </Link>
        <Button
          onClick={handlePlayAgainButton}
          className={`button ${styles.button}`}>
          Play again
        </Button>
      </div>
    </Container>
  );
};

export default Quiz;

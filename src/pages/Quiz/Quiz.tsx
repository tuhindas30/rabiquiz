import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { OptionItem } from "../../types/quiz.types";
import { useQuiz } from "../../contexts/QuizProvider";
import Option from "../../components/Option/Option";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { ReactComponent as EmptyQuizImage } from "../../assets/images/EmptyQuizImage.svg";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const { loading, quizzes, currentQuestionNumber, counter } =
    useQuiz().quizState;

  const {
    storeUserAnswers,
    changeQuestionOnOptionClick,
    changeQuestion,
    resetQuiz,
    resetCountDown,
    setQuestionId,
    triggerCountDown,
  } = useQuiz();

  const { id } = useParams();
  const navigate = useNavigate();

  const currentQuiz = quizzes.find((quiz) => quiz.category === id) ?? {
    category: "",
    quiz: [],
  };

  const totalQuizQuestions = currentQuiz.quiz.length ?? 0;

  const currentQuestion = currentQuiz.quiz[currentQuestionNumber - 1];

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
        if (currentQuestionNumber === totalQuizQuestions) {
          navigate(`/quizzes/${id}/results`);
        }
        changeQuestion(currentQuestionNumber);
        return;
      }
      triggerCountDown();
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestionNumber, counter]);

  const handleOptionClick = async (option: OptionItem) => {
    storeUserAnswers({
      categoryId: id,
      questionId: currentQuestion._id,
      answerId: option._id,
    });
    if (currentQuestionNumber === totalQuizQuestions) {
      navigate(`/quizzes/${id}/results`);
    }
    changeQuestionOnOptionClick(currentQuestionNumber);
  };

  if (loading) {
    return (
      <Container className="overlay" style={{ height: "88vh" }}>
        <Loader />
      </Container>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className={styles.emptyQuizContainer}>
        <EmptyQuizImage width="80%" />
        <p className={styles.message}>
          Missing quiz data! Try refreshing the page :)
        </p>
      </div>
    );
  }

  return (
    <Container className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>
        <div>
          Question: {currentQuestionNumber}/{totalQuizQuestions}
        </div>
        <div>Timer: {counter}/30</div>
      </div>
      <div className={styles.question}>{currentQuestion?.question}</div>
      <div className={styles.optionContainer}>
        {currentQuestion.options.map((option) => (
          <Option
            key={option._id}
            option={option}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {currentQuestionNumber === totalQuizQuestions ? (
          <Link to={`/quizzes/${id}/results`}>
            <Button className="button">View Score</Button>
          </Link>
        ) : (
          <Button
            onClick={() => changeQuestion(currentQuestionNumber)}
            className="button">
            Skip
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Quiz;

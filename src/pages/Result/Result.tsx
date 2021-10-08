import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { AnswerItem } from "../../types/quiz.types";
import { useQuiz } from "../../contexts/QuizProvider";
import QuizCard from "../../components/QuizCard/QuizCard";
import { ReactComponent as CheckmarkImage } from "../../assets/images/CheckmarkImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import styles from "./Result.module.css";

const Result = () => {
  const { verifyUserAnswers, resetQuiz, resetCountDown, clearUserAnswers } =
    useQuiz();
  const { loading, quizzes, selectedOptions } = useQuiz().quizState;
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<{
    score: number;
    answers: AnswerItem[];
  }>({ score: 0, answers: [] });

  const categoryQuiz = quizzes.find((quiz) => quiz.category === id);

  useEffect(() => {
    if (selectedOptions.answers.length === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (selectedOptions.answers.length > 0) {
      (async () => {
        const response = await verifyUserAnswers(selectedOptions);
        if (response && "data" in response) {
          setResult({
            score: response.data.score,
            answers: response.data.answers,
          });
        }
      })();
    }
  }, [selectedOptions]);

  const handlePlayAgainButton = () => {
    clearUserAnswers();
    resetQuiz();
    resetCountDown();
    navigate(`/quizzes/${id}`);
  };

  if (loading) {
    return (
      <Container fluid className="overlay">
        <Loader />
      </Container>
    );
  }

  return (
    <Container fluid className={`${styles.container} ${styles.scoreContainer}`}>
      <CheckmarkImage className={styles.checkmark} />
      <div className={styles.score}>Score: {result.score}</div>
      <div>
        <h1 style={{ color: "var(--rq-amber)" }}>Review </h1>
        {categoryQuiz?.quiz.map(({ _id, question, options }) => (
          <QuizCard
            key={_id}
            questionId={_id}
            question={question}
            options={options}
            result={result}
          />
        ))}
      </div>
      <div className={styles.scoreButtonContainer}>
        <Button href="/" className={`button ${styles.button}`}>
          Return to Home
        </Button>
        <Button
          onClick={handlePlayAgainButton}
          className={`button ${styles.button}`}>
          Play again
        </Button>
      </div>
    </Container>
  );
};

export default Result;

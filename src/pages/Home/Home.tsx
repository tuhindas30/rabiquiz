import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useQuiz } from "../../contexts/QuizProvider";
import Header from "../../components/Header/Header";
import Category from "../../components/Category/Category";
import Navigation from "../../components/Navigation/Navigation";
import QuizModal from "../../components/Modal";
import styles from "./Home.module.css";

const Home = () => {
  const { categories } = useQuiz().quizState;
  const [modalData, setModalData] = useState<string>("");
  const [quizModalShow, setQuizModalShow] = useState<boolean>(false);

  const handleCategoryClick = (quizId: string): void => {
    setModalData(quizId);
    setQuizModalShow(true);
  };

  return (
    <>
      <Navigation />
      <Container
        style={{
          marginTop: "5rem",
          textAlign: "center",
        }}>
        <Header />
        <h3 style={{ color: "var(--rq-amber)" }}>Categories</h3>
        <Row className={styles.categoryContainer}>
          {categories.map((category) => (
            <Category
              key={category._id}
              category={category}
              onCategoryClick={handleCategoryClick}
            />
          ))}
        </Row>
      </Container>
      <QuizModal
        data={modalData}
        show={quizModalShow}
        onHide={() => setQuizModalShow(false)}
      />
    </>
  );
};

export default Home;

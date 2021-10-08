import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useQuiz } from "../../contexts/QuizProvider";
import Header from "../../components/Header/Header";
import Category from "../../components/Category/Category";
import QuizModal from "../../components/Modal";
import Navigation from "../../components/Navigation/Navigation";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { ReactComponent as EmptyQuizImage } from "../../assets/images/EmptyQuizImage.svg";
import styles from "./Home.module.css";

const Home = () => {
  const { loading, categories } = useQuiz().quizState;
  const [modalData, setModalData] = useState<string>("");
  const [quizModalShow, setQuizModalShow] = useState<boolean>(false);

  const handleCategoryClick = (quizId: string): void => {
    setModalData(quizId);
    setQuizModalShow(true);
  };

  const renderCategories = () => {
    if (loading) {
      return <Loader width="8rem" height="8rem" />;
    }
    if (categories.length === 0) {
      return (
        <div className={styles.emptyCategoryContainer}>
          <EmptyQuizImage width="80%" />
          <p className={styles.message}>
            Missing categories! Try refreshing the page :)
          </p>
        </div>
      );
    }
    return categories.map((category) => (
      <Category
        key={category._id}
        category={category}
        onCategoryClick={handleCategoryClick}
      />
    ));
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
        <Row className={styles.categoryContainer}>{renderCategories()}</Row>
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

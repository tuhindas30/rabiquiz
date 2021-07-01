import { Row, Col, Button } from "react-bootstrap";
import { ReactComponent as Hero } from "./Hero.svg";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <Row className={styles.header}>
      <Col md="auto" className={styles.headingContainer}>
        <Row className={styles.heading}>Best Guitar Quizzes</Row>
        <Row className={styles.subHeading}>
          Love Guitar? Here's a beginner quiz for you!
        </Row>
        <Button href="#categories" className={`button ${styles.headerButton}`}>
          Explore Quizzes
        </Button>
      </Col>
      <Col>
        <Hero style={{ margin: "2rem 0" }} />
      </Col>
    </Row>
  );
};

export default Header;

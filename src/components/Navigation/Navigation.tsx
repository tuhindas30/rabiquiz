import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Navbar fixed="top" className={styles.navigation}>
      <Link to="/">
        <Navbar.Brand className={styles.navBrand}>RabiQuiz</Navbar.Brand>
      </Link>
    </Navbar>
  );
};

export default Navigation;

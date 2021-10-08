import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizProvider";

type ModalProps = {
  data: string;
  show: boolean;
  onHide: () => void;
};

const QuizModal = (props: ModalProps) => {
  const { categories } = useQuiz().quizState;
  const currentCategory = categories.find(
    (category) => category._id === props.data
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentCategory?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Description</h4>
        <p>{currentCategory?.description}</p>
        <Modal.Title id="contained-modal-title-vcenter">Rules:</Modal.Title>
        <ul style={{ margin: "0 2rem" }}>
          {currentCategory?.rules.map((rule) => (
            <li key={rule._id} style={{ padding: "0.5rem" }}>
              {rule.label}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Link to={`quizzes/${props.data}`}>
          <Button onClick={props.onHide} className="button">
            Start
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;

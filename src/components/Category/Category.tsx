import { Image } from "react-bootstrap";
import { CategoryItem } from "../../types/quiz.types";
import styles from "./Category.module.css";

export type CategoryParams = {
  category: CategoryItem;
  onCategoryClick: (quizId: string) => void;
};

const Category = ({ category, onCategoryClick }: CategoryParams) => {
  return (
    <div
      id="categories"
      key={category._id}
      onClick={() => onCategoryClick(category._id)}
      className={styles.imageContainer}>
      <div className="overlay">{category.title}</div>
      <Image src={category.imageUrl} rounded className={styles.image} />
    </div>
  );
};

export default Category;

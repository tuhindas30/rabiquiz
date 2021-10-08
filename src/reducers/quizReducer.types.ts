import { CategoryItem, Quiz, UserAnswers } from "../types/quiz.types";

export type InitialState = {
  categories: CategoryItem[];
  quizzes: Quiz[];
  selectedOptions: UserAnswers;
  loading: boolean;
  questionId: string | undefined;
  counter: number;
  isOptionDisabled: boolean;
  currentQuestionNumber: number;
};

export type StoreUserAnswersProps = {
  categoryId: string;
  questionId: string | undefined;
  answerId: string | undefined;
};

export type QuizActionType =
  | {
      type: "INITIALIZE_CATEGORIES";
      payload: { categories: CategoryItem[] };
    }
  | {
      type: "INITIALIZE_QUIZ";
      payload: { quizzes: Quiz[] };
    }
  | {
      type: "SET_LOADING";
    }
  | {
      type: "SET_QUESTION_ID";
      payload: { id: string | undefined };
    }
  | {
      type: "SET_SELECTED_OPTION";
      payload: StoreUserAnswersProps;
    }
  | {
      type: "CLEAR_SELECTED_OPTION";
    }
  | {
      type: "CHANGE_QUESTION";
      payload: { currentQuestionNumber: number };
    }
  | {
      type: "DISABLE_OPTIONS";
    }
  | {
      type: "TRIGGER_COUNTDOWN";
    }
  | {
      type: "RESET_COUNTDOWN";
    }
  | { type: "RESET" };

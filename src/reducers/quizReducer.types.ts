import { Option, CategoryItem, Question } from "../types/quiz.types";

export type InitialState = {
  categories: CategoryItem[];
  questions: Question[];
  options: Option[];
  loading: boolean;
  questionId: string;
  score: number;
  counter: number;
  isOptionDisabled: boolean;
  currentQuestionNumber: number;
};

export type QuizActionType =
  | {
      type: "INITIALIZE_CATEGORIES";
      payload: { categories: CategoryItem[] };
    }
  | {
      type: "INITIALIZE_QUESTIONS";
      payload: { questions: Question[] };
    }
  | {
      type: "INITIALIZE_OPTIONS";
      payload: { options: Option[] };
    }
  | {
      type: "SET_LOADING";
    }
  | {
      type: "SET_QUESTION_ID";
      payload: { id: string };
    }
  | {
      type: "INCREASE_SCORE";
      payload: { score: number };
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

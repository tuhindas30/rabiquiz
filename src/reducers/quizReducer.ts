import { initialState } from "../contexts/QuizProvider";
import { QuizActionType } from "./quizReducer.types";

export const quizReducer = (
  state: typeof initialState,
  action: QuizActionType
) => {
  switch (action.type) {
    case "INITIALIZE_CATEGORIES":
      return { ...state, categories: action.payload.categories };

    case "INITIALIZE_QUIZ":
      return { ...state, quizzes: action.payload.quizzes };

    case "SET_LOADING":
      return { ...state, loading: !state.loading };

    case "SET_QUESTION_ID":
      return { ...state, questionId: action.payload.id };

    case "SET_SELECTED_OPTION":
      return {
        ...state,
        selectedOptions: {
          categoryId: action.payload.categoryId,
          answers: [
            ...state.selectedOptions.answers,
            {
              questionId: action.payload.questionId,
              optionId: action.payload.answerId,
            },
          ],
        },
      };

    case "CLEAR_SELECTED_OPTION":
      return { ...state, selectedOptions: { categoryId: "", answers: [] } };

    case "CHANGE_QUESTION":
      return {
        ...state,
        currentQuestionNumber: action.payload.currentQuestionNumber + 1,
      };

    case "DISABLE_OPTIONS":
      return { ...state, isOptionDisabled: !state.isOptionDisabled };

    case "TRIGGER_COUNTDOWN":
      return { ...state, counter: state.counter - 1 };

    case "RESET_COUNTDOWN":
      return { ...state, counter: 30 };

    case "RESET":
      return { ...state, currentQuestionNumber: 1 };

    default:
      return state;
  }
};

export default quizReducer;

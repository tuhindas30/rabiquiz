import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import {
  InitialState,
  StoreUserAnswersProps,
} from "../reducers/quizReducer.types";
import { UserAnswers } from "../types/quiz.types";
import * as categoryApi from "../api/category/category";
import * as quizApi from "../api/quiz/quiz";
import quizReducer from "../reducers/quizReducer";
import { ServerResponse, verifyAnswers } from "../api/answer/answer";
import showToast from "../utils/showToast";

export const initialState: InitialState = {
  categories: [],
  quizzes: [],
  selectedOptions: {
    categoryId: "",
    answers: [],
  },
  loading: false,
  questionId: "",
  counter: 30,
  isOptionDisabled: false,
  currentQuestionNumber: 1,
};

type QuizContextType = {
  quizState: typeof initialState;
  storeUserAnswers: (answerObj: StoreUserAnswersProps) => void;
  changeQuestionOnOptionClick: (currentQuestionNumber: number) => void;
  changeQuestion: (currentQuestionNumber: number) => void;
  triggerCountDown: () => void;
  resetQuiz: () => void;
  resetCountDown: () => void;
  setQuestionId: (questionId: string | undefined) => void;
  verifyUserAnswers: (
    ansObj: UserAnswers
  ) => Promise<ServerResponse | { errMessage: string } | undefined>;
  clearUserAnswers: () => void;
};

const QuizContext = createContext({} as QuizContextType);

const QuizProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, initialState);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    (async () => {
      try {
        quizDispatch({ type: "SET_LOADING" });
        const response = await categoryApi.getAllCategories();
        if ("data" in response) {
          quizDispatch({
            type: "INITIALIZE_CATEGORIES",
            payload: { categories: response.data },
          });
        }
      } catch (err) {
        quizDispatch({
          type: "INITIALIZE_CATEGORIES",
          payload: { categories: [] },
        });
      } finally {
        quizDispatch({ type: "SET_LOADING" });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        quizDispatch({ type: "SET_LOADING" });
        const response = await quizApi.getAllQuiz();
        if ("data" in response) {
          quizDispatch({
            type: "INITIALIZE_QUIZ",
            payload: { quizzes: response.data },
          });
        }
      } catch (err) {
        quizDispatch({
          type: "INITIALIZE_QUIZ",
          payload: { quizzes: [] },
        });
      } finally {
        quizDispatch({ type: "SET_LOADING" });
      }
    })();
  }, []);

  const storeUserAnswers = (ansObj: StoreUserAnswersProps) => {
    quizDispatch({
      type: "SET_SELECTED_OPTION",
      payload: { ...ansObj },
    });
  };

  const clearUserAnswers = () => {
    quizDispatch({ type: "CLEAR_SELECTED_OPTION" });
  };

  const changeQuestionOnOptionClick = (currentQuestionNumber: number) => {
    quizDispatch({ type: "DISABLE_OPTIONS" });
    setTimeout(() => {
      quizDispatch({
        type: "CHANGE_QUESTION",
        payload: { currentQuestionNumber },
      });
      quizDispatch({ type: "DISABLE_OPTIONS" });
      quizDispatch({ type: "RESET_COUNTDOWN" });
    }, 2000);
  };

  const changeQuestion = (currentQuestionNumber: number) => {
    quizDispatch({
      type: "CHANGE_QUESTION",
      payload: { currentQuestionNumber },
    });
    quizDispatch({ type: "RESET_COUNTDOWN" });
  };

  const verifyUserAnswers = async (ansObj: UserAnswers) => {
    try {
      quizDispatch({ type: "SET_LOADING" });
      const response = await verifyAnswers(ansObj);
      return response;
    } catch (err) {
      showToast("Something went wrong!");
    } finally {
      quizDispatch({ type: "SET_LOADING" });
    }
  };

  const triggerCountDown = () => quizDispatch({ type: "TRIGGER_COUNTDOWN" });

  const resetQuiz = () => quizDispatch({ type: "RESET" });

  const resetCountDown = () => quizDispatch({ type: "RESET_COUNTDOWN" });

  const setQuestionId = (questionId: string | undefined) =>
    quizDispatch({
      type: "SET_QUESTION_ID",
      payload: { id: questionId },
    });

  return (
    <QuizContext.Provider
      value={{
        quizState,
        storeUserAnswers,
        changeQuestionOnOptionClick,
        changeQuestion,
        triggerCountDown,
        resetQuiz,
        resetCountDown,
        setQuestionId,
        verifyUserAnswers,
        clearUserAnswers,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };

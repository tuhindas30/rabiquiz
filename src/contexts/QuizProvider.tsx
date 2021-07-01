import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { InitialState } from "../reducers/quizReducer.types";
import * as categoryApi from "../api/category/category";
import * as questionApi from "../api/question/question";
import * as answerApi from "../api/option/option";
import quizReducer from "../reducers/quizReducer";

export const initialState: InitialState = {
  categories: [],
  questions: [],
  options: [],
  loading: false,
  questionId: "",
  score: 0,
  counter: 30,
  isOptionDisabled: false,
  currentQuestionNumber: 1,
};

type QuizContextType = {
  quizState: typeof initialState;
  increaseScore: (points: number) => void;
  changeQuestionOnOptionClick: (currentQuestionNumber: number) => void;
  changeQuestion: (currentQuestionNumber: number) => void;
  triggerCountDown: () => void;
  resetQuiz: () => void;
  resetCountDown: () => void;
  setQuestionId: (questionId: string) => void;
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
        const response = await questionApi.getAllQuestions();
        if ("data" in response) {
          quizDispatch({
            type: "INITIALIZE_QUESTIONS",
            payload: { questions: response.data },
          });
        }
      } catch (err) {
        quizDispatch({
          type: "INITIALIZE_QUESTIONS",
          payload: { questions: [] },
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
        const response = await answerApi.getAllOptions();
        if ("data" in response) {
          quizDispatch({
            type: "INITIALIZE_OPTIONS",
            payload: { options: response.data },
          });
        }
      } catch (err) {
        quizDispatch({ type: "INITIALIZE_OPTIONS", payload: { options: [] } });
      } finally {
        quizDispatch({ type: "SET_LOADING" });
      }
    })();
  }, []);

  const increaseScore = (points: number) =>
    quizDispatch({
      type: "INCREASE_SCORE",
      payload: {
        score: points,
      },
    });

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

  const triggerCountDown = () => quizDispatch({ type: "TRIGGER_COUNTDOWN" });

  const resetQuiz = () => quizDispatch({ type: "RESET" });

  const resetCountDown = () => quizDispatch({ type: "RESET_COUNTDOWN" });

  const setQuestionId = (questionId: string) =>
    quizDispatch({
      type: "SET_QUESTION_ID",
      payload: { id: questionId },
    });

  return (
    <QuizContext.Provider
      value={{
        quizState,
        increaseScore,
        changeQuestionOnOptionClick,
        changeQuestion,
        triggerCountDown,
        resetQuiz,
        resetCountDown,
        setQuestionId,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };

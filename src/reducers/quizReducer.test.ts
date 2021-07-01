import quizReducer from "../reducers/quizReducer";
import { initialState } from "../contexts/QuizProvider";
import { QuizActionType } from "./quizReducer.types";

describe("testing quiz reducer", () => {
  test("should initialize categories received from server in the state", () => {
    const action: QuizActionType = {
      type: "INITIALIZE_CATEGORIES",
      payload: {
        categories: [
          {
            _id: "1",
            title: "Category 1",
            imageUrl: "https://dummyimage.com",
            description: "I am category 1",
            rules: [],
          },
        ],
      },
    };

    const state = quizReducer(initialState, action);
    expect(state).toEqual({
      categories: [
        {
          _id: "1",
          title: "Category 1",
          imageUrl: "https://dummyimage.com",
          description: "I am category 1",
          rules: [],
        },
      ],
      questions: [],
      options: [],
      loading: false,
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should initialize questions received from the server in the state", () => {
    const action: QuizActionType = {
      type: "INITIALIZE_QUESTIONS",
      payload: {
        questions: [
          {
            category: "Category 1",
            questions: [],
          },
        ],
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      questions: [
        {
          category: "Category 1",
          questions: [],
        },
      ],
      categories: [],
      options: [],
      loading: false,
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should initialize options received from the server in the state", () => {
    const action: QuizActionType = {
      type: "INITIALIZE_OPTIONS",
      payload: {
        options: [
          {
            category: "Category 1",
            items: [],
          },
        ],
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      options: [
        {
          category: "Category 1",
          items: [],
        },
      ],
      questions: [],
      categories: [],
      loading: false,
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should toggle loading state", () => {
    const action: QuizActionType = {
      type: "SET_LOADING",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      loading: true,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });

    const nextState = quizReducer(state, action);

    expect(nextState).toEqual({
      loading: false,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should set question current question id", () => {
    const action: QuizActionType = {
      type: "SET_QUESTION_ID",
      payload: {
        id: "1",
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      questionId: "1",
      questions: [],
      options: [],
      categories: [],
      loading: false,
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should increase score if option is correct", () => {
    const action: QuizActionType = {
      type: "INCREASE_SCORE",
      payload: {
        score: 5,
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      score: 5,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      loading: false,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });

    const nextState = quizReducer(state, action);

    expect(nextState).toEqual({
      score: 10,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      loading: false,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should change question after timeout or on option click", () => {
    const action: QuizActionType = {
      type: "CHANGE_QUESTION",
      payload: {
        currentQuestionNumber: 2,
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionNumber: 3,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      counter: 30,
      isOptionDisabled: false,
      loading: false,
    });
  });

  test("should disable option button on click", () => {
    const action: QuizActionType = {
      type: "DISABLE_OPTIONS",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      isOptionDisabled: true,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      counter: 30,
      loading: false,
      currentQuestionNumber: 1,
    });

    const nextState = quizReducer(state, action);

    expect(nextState).toEqual({
      isOptionDisabled: false,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      counter: 30,
      loading: false,
      currentQuestionNumber: 1,
    });
  });

  test("should initiate countdown timer", () => {
    const action: QuizActionType = {
      type: "TRIGGER_COUNTDOWN",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      counter: 29,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      loading: false,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should reset countdown timer", () => {
    const action: QuizActionType = {
      type: "RESET_COUNTDOWN",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      counter: 30,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      score: 0,
      loading: false,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should reset the quiz score and current question number", () => {
    const action: QuizActionType = {
      type: "RESET",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      score: 0,
      currentQuestionNumber: 1,
      questions: [],
      options: [],
      categories: [],
      questionId: "",
      loading: false,
      counter: 30,
      isOptionDisabled: false,
    });
  });
});

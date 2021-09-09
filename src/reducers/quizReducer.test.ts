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
    });
  });

  test("should initialize quizzes received from the server in the state", () => {
    const action: QuizActionType = {
      type: "INITIALIZE_QUIZ",
      payload: {
        quizzes: [
          {
            category: "Category 1",
            quiz: [],
          },
        ],
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      quizzes: [
        {
          category: "Category 1",
          quiz: [],
        },
      ],
      categories: [],
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      questionId: "",
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
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: true,
      quizzes: [],
      categories: [],
      questionId: "",
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });

    const nextState = quizReducer(state, action);

    expect(nextState).toEqual({
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      quizzes: [],
      categories: [],
      questionId: "",
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
      quizzes: [],
      categories: [],
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should set selected option by the user", () => {
    const action: QuizActionType = {
      type: "SET_SELECTED_OPTION",
      payload: {
        categoryId: "12345",
        answerId: "1234",
        questionId: "123",
      },
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      questionId: "",
      quizzes: [],
      categories: [],
      selectedOptions: {
        categoryId: "12345",
        answers: [
          {
            optionId: "1234",
            questionId: "123",
          },
        ],
      },
      loading: false,
      counter: 30,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should clear selected options by the user", () => {
    const action: QuizActionType = {
      type: "CLEAR_SELECTED_OPTION",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      questionId: "",
      quizzes: [],
      categories: [],
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
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
      quizzes: [],
      categories: [],
      questionId: "",
      counter: 30,
      isOptionDisabled: false,
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
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
      quizzes: [],
      categories: [],
      questionId: "",
      counter: 30,
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      currentQuestionNumber: 1,
    });

    const nextState = quizReducer(state, action);

    expect(nextState).toEqual({
      isOptionDisabled: false,
      quizzes: [],
      categories: [],
      questionId: "",
      counter: 30,
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
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
      quizzes: [],
      categories: [],
      questionId: "",
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
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
      quizzes: [],
      categories: [],
      questionId: "",
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      isOptionDisabled: false,
      currentQuestionNumber: 1,
    });
  });

  test("should reset the current question number", () => {
    const action: QuizActionType = {
      type: "RESET",
    };

    const state = quizReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionNumber: 1,
      quizzes: [],
      categories: [],
      questionId: "",
      selectedOptions: {
        categoryId: "",
        answers: [],
      },
      loading: false,
      counter: 30,
      isOptionDisabled: false,
    });
  });
});

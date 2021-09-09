import axios from "axios";
import { getAllQuiz } from "./quiz";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get all quiz API", () => {
  test("should return all quiz when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          _id: "1",
          category: "12345",
          quiz: [],
        },
      ],
    });

    const quizzes = await getAllQuiz();

    expect(quizzes).toEqual([
      {
        _id: "1",
        category: "12345",
        quiz: [],
      },
    ]);
  });
});

test("should return an error message when API call fails", async () => {
  mockedAxios.get.mockRejectedValue({
    response: {
      data: {
        errMessage: "Something went wrong",
      },
    },
  });

  const quizzes = await getAllQuiz();

  expect(quizzes).toEqual({ errMessage: "Something went wrong" });
});

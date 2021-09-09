import axios from "axios";
import { verifyAnswers } from "./answer";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get all quiz API", () => {
  test("should return all quiz when API call is successful", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        score: "45",
        answers: [],
      },
    });

    const answers = await verifyAnswers({
      categoryId: "12345",
      answers: [],
    });

    expect(answers).toEqual({
      score: "45",
      answers: [],
    });
  });
});

test("should return an error message when API call fails", async () => {
  mockedAxios.post.mockRejectedValue({
    response: {
      data: {
        errMessage: "Something went wrong",
      },
    },
  });

  const categories = await verifyAnswers({
    categoryId: "12345",
    answers: [],
  });

  expect(categories).toEqual({ errMessage: "Something went wrong" });
});

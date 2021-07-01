import axios from "axios";
import { getAllQuestions } from "./question";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get all options API", () => {
  test("should return all options when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          category: "Category 1",
          questions: [],
        },
      ],
    });

    const options = await getAllQuestions();

    expect(options).toEqual([
      {
        category: "Category 1",
        questions: [],
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

  const categories = await getAllQuestions();

  expect(categories).toEqual({ errMessage: "Something went wrong" });
});

import axios from "axios";
import { getAllCategories } from "./category";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("get all categories API", () => {
  test("should return all categories when API call is successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          _id: "1",
          imageUrl: "https://dummyimage.com",
          title: "Category 1",
          description: "This is category 1",
          rules: [],
        },
      ],
    });

    const categories = await getAllCategories();

    expect(categories).toEqual([
      {
        _id: "1",
        imageUrl: "https://dummyimage.com",
        title: "Category 1",
        description: "This is category 1",
        rules: [],
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

  const categories = await getAllCategories();

  expect(categories).toEqual({ errMessage: "Something went wrong" });
});

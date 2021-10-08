import axios, { AxiosError } from "axios";
import { BASE_URL } from "../helper";
import { CategoryItem } from "../../types/quiz.types";

const url = `${BASE_URL}/categories`;

type ServerResponse = {
  status: string;
  data: CategoryItem[];
  message: string;
};

type ServerError = {
  status: string;
  message: string;
};

const getAllCategories = async () => {
  try {
    const { data } = await axios.get<ServerResponse>(url);
    return data;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
    }
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        throw new Error(serverError.response.data.message);
      }
    }
    return { errMessage: "Something went wrong" };
  }
};

export { getAllCategories };

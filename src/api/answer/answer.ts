import axios, { AxiosError } from "axios";
import { BASE_URL } from "../helper";
import { AnswerItem, UserAnswers } from "../../types/quiz.types";

const url = `${BASE_URL}/verify`;

export type ServerResponse = {
  status: string;
  data: { score: number; answers: AnswerItem[] };
  message: string;
};

export type ServerError = {
  status: string;
  message: string;
};

const verifyAnswers = async (answers: UserAnswers) => {
  try {
    const { data } = await axios.post<ServerResponse>(url, answers);
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

export { verifyAnswers };

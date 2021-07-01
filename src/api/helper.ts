import { AxiosError } from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

type ServerError = {
  status: string;
  message: string;
};

const handleApiError = (err: AxiosError<ServerError>) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  if (err && err.response) {
    return err.response.data.message;
  }
  return { message: "Error" };
};

export { BASE_URL, handleApiError };

import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../common/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    console.log(message);
    return Promise.reject(error);
  }
);

export const axiosErrorHandling = (
  error: unknown,
  fallback = "Something went wrong"
) => {
  if (error instanceof AxiosError) {
    return error.response?.data.message || fallback;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};

export default axiosInstance;

import axios, { AxiosInstance } from "axios";
import cookies from "react-cookies";

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: `Bearer ${cookies.load("access_token")}`,
  },
});

customAxios.interceptors.request.use((config) => {
  if (
    config.headers.Authorization === "Bearer undefined" &&
    cookies.load("access_token") !== undefined
  ) {
    config.headers.Authorization = `Bearer ${cookies.load("access_token")}`;
  }
  return config;
});

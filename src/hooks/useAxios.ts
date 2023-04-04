import { useState, useEffect } from "react";
import cookies from "react-cookies";
import axios, { AxiosInstance } from "axios";

const useAxios = () => {
  const [token, setToken] = useState("");

  //   useEffect(() => {});
  const customAxios: AxiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: `Bearer ${cookies.load("access_token")}` ?? null,
    },
  });

  return { customAxios };
};

export default useAxios;

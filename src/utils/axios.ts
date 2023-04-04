import axios, { AxiosInstance } from "axios";
import cookies from "react-cookies";

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization: `Bearer ${cookies.load("access_token")}` ?? null,
  },
});

export const axiosFetch = async (url: string, method: string, body?: any) => {
  let errMessage = "";
  let responseData = null;

  const apiUrl = process.env.REACT_APP_API_URL + url;

  if (method === "GET") {
    await axios
      .get(apiUrl)
      .then(function (response) {
        return new Promise((resolve) => {
          resolve(response);
        });
      })
      .catch(function (error) {
        const data = error.response.data;
        const message = data.message;
        errMessage = message;
      });
  } else if (method === "POST") {
    if (body) {
      try {
        const response = await axios.post(apiUrl, body);
        return response.data;
      } catch (err) {
        const data = err.response.data;
        return data;
      }
    }
  } else if (method === "PATCH") {
    axios
      .patch(apiUrl)
      .then(function (response) {
        responseData = response;
      })
      .catch(function (error) {
        const data = error.response.data;
        const message = data.message;
        errMessage = message;
      });
  } else if (method === "DELETE") {
    axios
      .delete(apiUrl)
      .then(function (response) {
        responseData = response;
      })
      .catch(function (error) {
        const data = error.response.data;
        const message = data.message;
        errMessage = message;
      });
  }
  //   if (responseData !== null) {
  //     return responseData;
  //   } else {
  //     return errMessage;
  //   }
};

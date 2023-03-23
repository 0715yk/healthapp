import axios from "axios";

export const axiosFetch = (url: string, method: string, body?: any) => {
  if (method === "GET") {
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (method === "POST") {
    if (body) {
      axios
        .post(url, body)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  } else if (method === "PATCH") {
    axios
      .patch(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (method === "DELETE") {
    axios
      .delete(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

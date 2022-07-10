import axios from "axios";
import config from "../app.config";

export const todoApi = () => {
  const instance = axios.create({
    baseURL: config.todo_api,
    timeout: 3000,
  });

  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const get = async (path) => {
    try {
      const response = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const del = async (path) => {
    try {
      const response = await instance.delete(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  const update = async (path, data) => {
    try {
      const response = await instance.patch(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response;
    }
  };

  return { post, get, del, update }; // _private_stuff
};

/*

*/

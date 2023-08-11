import axios, { InternalAxiosRequestConfig } from "axios";
import { environment } from "./config";

const myAppApi = axios.create({
  baseURL: environment.server,
});

myAppApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "my-app-token": localStorage.getItem("my-app-token"),
  };

  return config;
});

myAppApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error, "ERROR")
      window.location.href = "/";
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default myAppApi;

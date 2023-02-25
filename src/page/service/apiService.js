import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/apis",
  timeout: 30000,
  withCredentials: true,
  // header: {},
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("hehe");
    return Promise.reject(error);
  }
);

export default axiosInstance;

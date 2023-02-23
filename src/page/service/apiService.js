import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/apis",
  timeout: 30000,
  // header: {},
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default axiosInstance;

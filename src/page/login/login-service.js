import axiosInstance from "../service/apiService";

export async function postLogin(request) {
  const response = await axiosInstance.post("/auth/login", request);
  return response.data;
}

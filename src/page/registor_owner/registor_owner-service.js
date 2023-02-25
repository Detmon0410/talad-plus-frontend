import axiosInstance from "../service/apiService";

export async function postRegister(request) {
  const response = await axiosInstance.post("/auth/market/register", request);
  return response.data;
}

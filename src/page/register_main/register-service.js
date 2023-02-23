import axiosInstance from "../service/apiService";

export async function postRegister(request) {
  const response = await axiosInstance.post("/user/register", request);
  return response.data;
}

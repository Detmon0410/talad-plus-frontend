import axiosInstance from "../service/apiService";

export async function postRegister(request) {
  const response = await axiosInstance.post("/market/register", request);
  return response.data;
}

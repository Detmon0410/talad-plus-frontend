import axiosInstance from "../service/apiService";

export async function postRegister(request) {
  const response = await axiosInstance.post("/profile", request);
  return response.data;
}

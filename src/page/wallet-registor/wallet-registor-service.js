import axiosInstance from "../service/apiService";

export async function postCreateWallet(payload) {
  const response = await axiosInstance.post("/wallet/create", payload);
  return response.data;
}

import axiosInstance from "../service/apiService";

export async function getmyWallet() {
  const response = await axiosInstance.get("/wallet/me");
  return response.data;
}

export async function getMyHistory() {
  const response = await axiosInstance.get("/wallet/history");
  return response.data;
}

export async function patchWithdraw() {
  const response = await axiosInstance.patch("/wallet/withdraw");
  return response.data;
}

import axiosInstance from "../service/apiService";

export async function postMyMarket(request) {
  const response = await axiosInstance.get("/manage/market", request);
  return response.data;
}

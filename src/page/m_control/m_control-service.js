import axiosInstance from "../service/apiService";

export async function postCreateStall() {
  const response = await axiosInstance.post("/manage/market/:marketId/stall");
  return response.data;
}

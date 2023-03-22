import axiosInstance from "../service/apiService";

export async function postCreateStall(marketId, payload) {
  const response = await axiosInstance.post(
    `/manage/market/${marketId}/stall`,
    payload
  );
  return response.data;
}

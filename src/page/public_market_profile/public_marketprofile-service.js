import axiosInstance from "../service/apiService";

export async function getSelectedMarket(request, marketId) {
  const stageId = marketId;
  const response = await axiosInstance.get(
    `/manage/mprofile/${stageId}`,
    request
  );
  return response.data;
}
export async function postCreateReview(payload) {
  const response = await axiosInstance.post("/market/review", payload);
  return response.data;
}

export async function getReview(marketId) {
  const response = await axiosInstance.get(`/market/${marketId}/review`);
  return response.data;
}

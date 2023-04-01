import axiosInstance from "../service/apiService";

export async function getSelectedMarket(request, marketId) {
  const stageId = marketId;
  const response = await axiosInstance.get(
    `/manage/mprofile/${stageId}`,
    request
  );
  return response.data;
}

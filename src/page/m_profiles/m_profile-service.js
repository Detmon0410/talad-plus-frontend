import axiosInstance from "../service/apiService";

export async function postMyMarket(request) {
  const response = await axiosInstance.get("/manage/market", request);
  return response.data;
}

export async function postImg(payload) {
  const response = await axiosInstance.post("/manage/uploadimage", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
export async function getMyImgList(marketId) {
  const response = await axiosInstance.get(`/manage/${marketId}/getimage`);
  return response.data;
}

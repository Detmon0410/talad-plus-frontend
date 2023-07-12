import axiosInstance from "../service/apiService";

export async function postMyMarket(request) {
  const response = await axiosInstance.get("/manage/market", request);
  return response.data;
}

export async function postImg(payload) {
  const response = await axiosInstance.post("/manage/uploadimage", payload);
  return response.data;
}
export async function getMyImgList() {
  const response = await axiosInstance.get("/manage/getimage");
  return response.data;
}

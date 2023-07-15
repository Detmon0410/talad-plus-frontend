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

export async function postDeleteImage(payload) {
  const response = await axiosInstance.post(`/manage/deleteimage`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

// Service function to patch the detail of a market
export async function patchDetail(payload) {
  try {
    const response = await axiosInstance.post(`/market/editdetail`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update market detail");
  }
}

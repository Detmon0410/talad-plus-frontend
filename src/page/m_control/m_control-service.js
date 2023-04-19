import axiosInstance from "../service/apiService";

export async function postCreateStall(marketId, payload) {
  const response = await axiosInstance.post(
    `/manage/market/${marketId}/stall`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function postEditstatus(marketId, payloadstatus) {
  const response = await axiosInstance.post(
    `/manage/market/${marketId}/stall/changestatus`,
    payloadstatus
  );

  return response.data;
}

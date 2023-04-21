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

export async function postReject(marketId, payloadstatus) {
  const response = await axiosInstance.delete(
    `/manage/market/${marketId}/stall/reject`,
    payloadstatus
  );

  return response.data;
}

export async function postReport(payload) {
  console.log(payload);
  const response = await axiosInstance.post(`/profile/report`, payload);

  return response.data;
}

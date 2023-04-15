import axiosInstance from "../service/apiService";

export async function getStallAll(marketId) {
  const response = await axiosInstance.get(
    `/manage/market/${marketId}/getstall`
  );
  return response.data;
}

export async function getSubStall(payload, marketId) {
  const date = payload.date;
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString();
  let formattedDate = `${year}-${month}-${day}`;
  const response = await axiosInstance.get(
    `/manage/market/${marketId}/stall/${payload.zoneId}/getsubstall`,
    { params: { date: formattedDate } }
  );
  return response.data;
}

export async function postRentStall(payload, marketId) {
  const response = await axiosInstance.post(
    `/manage/market/${marketId}/stall/${payload.zoneId}/rent`,
    payload
  );
  return response;
}

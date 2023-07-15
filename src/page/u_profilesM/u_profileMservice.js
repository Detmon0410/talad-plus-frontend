import axiosInstance from "../service/apiService";

export async function getMerchant(refid) {
  const response = await axiosInstance.get(`profile/view/${refid}`);
  return response.data;
}

export async function getReported(uid) {
  console.log(uid);
  const response = await axiosInstance.get(`profile/reported/${uid}`);
  return response.data;
}

export async function getViewFavorite(uid) {
  console.log(uid);
  const response = await axiosInstance.get(`profile/${uid}/favlist`);
  return response.data;
}

import axiosInstance from "../service/apiService";

export async function postGetAllMaket() {
  const response = await axiosInstance.get("/market");
  return response.data;
}

export async function postLikeMarket(payload) {
  const response = await axiosInstance.post("/profile/favorite", payload);

  return response.data;
}

export async function getLikeMarket() {
  const response = await axiosInstance.get("/profile/user/myfavorite");
  return response.data;
}

export async function postUnLikeMarket(payload) {
  const response = await axiosInstance.post("/profile/deletefavorite", payload);
  return response.data;
}

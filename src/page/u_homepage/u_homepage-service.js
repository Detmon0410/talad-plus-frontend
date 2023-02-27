import axiosInstance from "../service/apiService";

export async function postGetAllMaket() {
  const response = await axiosInstance.get("/market");
  return response.data;
}

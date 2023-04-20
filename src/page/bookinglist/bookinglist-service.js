import axiosInstance from "../service/apiService";

export async function getBookedStall() {
  const response = await axiosInstance.get(`/profile/user/substall`);
  return response.data;
}

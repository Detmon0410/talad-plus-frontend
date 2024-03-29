import axiosInstance from "../service/apiService";

export async function getBookedStall() {
  const response = await axiosInstance.get(`/profile/user/substall`);
  return response.data;
}
export async function getSelectedStall(stallId) {
  const response = await axiosInstance.get(`/profile/receipt/${stallId}`);
  return response.data;
}

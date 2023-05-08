import axiosInstance from "../../service/apiService";

export async function getSelectedStall(stallId) {
  const response = await axiosInstance.get(`/profile/receipt/${stallId}`);
  return response.data;
}

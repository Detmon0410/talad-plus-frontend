import axiosInstance from "../service/apiService";

export async function postMyProfile(request) {
  const response = await axiosInstance.get("/profile/user", request);
  return response.data;
}

import axiosInstance from "../service/apiService";

export async function postMeRegister(request) {
  console.log("service");
  console.log(request);
  const response = await axiosInstance.post("/profile/registerm", request, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

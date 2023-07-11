import axiosInstance from "../service/apiService";

export async function getMyMarketNear(district, province) {
  try {
    const response = await axiosInstance.get("/market/search", {
      params: {
        district: district,
        province: province,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

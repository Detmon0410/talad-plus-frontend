import axiosInstance from "../service/apiService";

export async function getmyWallet() {
  const response = await axiosInstance.get("/wallet/me");
  return response.data;
}

export async function getMyHistory() {
  const response = await axiosInstance.get("/wallet/history");
  return response.data;
}

export async function getWithdrawList() {
  const response = await axiosInstance.get("/admin/withdraw");
  return response.data;
}

export async function patchReject() {
  const response = await axiosInstance.patch("/:wallet/reject");
  return response.data;
}

export async function patchApprove(withdraw, payloadstatus) {
  console.log(withdraw);
  const response = await axiosInstance.patch(
    `/${withdraw}/approve`,
    payloadstatus
  );
  return response.data;
}

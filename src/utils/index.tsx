import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_ROOT } from "./constants";

const api: AxiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 600000, // 10 phút
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // nếu muốn có toast success thì bật lại
    // if (response.data?.message) toast.success(response.data.message);
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status !== 410) {
      // nếu muốn có toast error thì bỏ comment
      // toast.error(
      //   (error.response?.data as { message?: string })?.message || error.message || "Something went wrong"
      // );
    }
    return Promise.reject(error);
  }
);

export default api;

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_ROOT } from "./constants";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api: AxiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 600000,
});

// Request interceptor: tự động attach accessToken
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJteW1hdGNoIiwic2NvcGUiOiJST0xFX01BTkFHRVIgcmV2aWV3Y3JpdGVyaWE6ZGVsZXRlIHVuaXZlcnNpdHk6ZGVsZXRlIHN3YXByZXF1ZXN0OnJlYWQgY291cnNlOnVwZGF0ZSBzdHVkZW50OnJlYWQgY291cnNlOmNyZWF0ZSByZXZpZXc6Y3JlYXRlIGxlY3R1cmVyOnVwZGF0ZSB1bml2ZXJzaXR5OnVwZGF0ZSByb2xlOmRlbGV0ZSBjYW1wdXM6dXBkYXRlIGxlY3R1cmVyOmRlbGV0ZSBzdHVkZW50OmRlbGV0ZSByZXZpZXdjcml0ZXJpYTpjcmVhdGUgY2FtcHVzOmNyZWF0ZSByZXZpZXc6cmVhZCB1bml2ZXJzaXR5OmNyZWF0ZSBjb3Vyc2U6ZGVsZXRlIGxlY3R1cmVyOmNyZWF0ZSByZXZpZXdjcml0ZXJpYTp1cGRhdGUgY2FtcHVzOmRlbGV0ZSByb2xlOnJlYWQgc3dhcHJlcXVlc3Q6Y2FuY2VsIHJvbGU6dXBkYXRlIiwiaXNzIjoibXltYXRjaC5jb20iLCJleHAiOjE3NTc0MzM0MzgsImlhdCI6MTc1NzQyOTgzOCwidXNlcklkIjoxLCJqdGkiOiIxM2MwZmE1Yy05NzE0LTQ1NzYtYWIyZS04ZGQwN2MyN2ZkNzAifQ.gBE_hT8UIvwYvoKpe3LTUQY1h4tCY-E6MH48Yd-NB8c";
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đã có request refresh đang chạy, đợi nó xong
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // Gọi API refresh token
        const res = await axios.post(`${API_ROOT}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        // Lưu token mới
        localStorage.setItem("accessToken", newAccessToken);

        // Xử lý lại queue
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Gắn token mới vào request cũ
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        // Refresh fail → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

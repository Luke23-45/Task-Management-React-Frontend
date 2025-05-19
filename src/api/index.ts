import axios, {
  type AxiosRequestConfig,
  AxiosError,
  type AxiosResponse,
} from "axios";
import { getAppDispatch } from "@/store";
import { setTokens, logout } from "@/store/slices/authSlice";
import { type AuthTokens } from "@/types/auth";
import { refreshToken as callRefreshTokenApi } from "./mutations/authMutaton";
const API_BASE_URL =
  import.meta.env.VITE_TASK_API_BASE_URL || "http://127.0.0.1:8000/api/";
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.config.headers = {
        ...promise.config.headers,
        Authorization: `Bearer ${token}`,
      };

      api(promise.config).then(promise.resolve).catch(promise.reject);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = [
      "/users/login/",
      "/users/register/",
      "/users/login/refresh/",
    ];

    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.endsWith(endpoint)
    );

    if (!isPublicEndpoint) {
      const authTokens = JSON.parse(
        localStorage.getItem("authTokens") || "null"
      );
      const accessToken = authTokens?.access;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.endsWith("/users/login/refresh/")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const authTokens = JSON.parse(
            localStorage.getItem("authTokens") || "null"
          );
          const refreshToken = authTokens?.refresh;

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          const refreshResponse = await callRefreshTokenApi({
            refresh: refreshToken,
          });
          const { access: newAccessToken, refresh: newRefreshToken } =
            refreshResponse;

          const dispatch = getAppDispatch();

          localStorage.setItem(
            "authTokens",
            JSON.stringify({
              access: newAccessToken,
              refresh: newRefreshToken || refreshToken,
            })
          );
          dispatch(
            setTokens({
              access: newAccessToken,
              refresh: newRefreshToken || refreshToken,
            })
          );

          processQueue(null, newAccessToken);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return api(originalRequest);
        } catch (refreshError: any) {
          console.error("Token refresh failed. Logging out.", refreshError);

          const dispatch = getAppDispatch();

          localStorage.removeItem("authTokens");
          dispatch(logout());

          processQueue(refreshError);

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }
    }

    console.error("API Response Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;

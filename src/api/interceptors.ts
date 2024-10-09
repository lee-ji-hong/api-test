import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "./authUtils";
import { reqLogin } from "./remotes";

export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
      });
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`[Response] ${response.status} ${response.config.url}`, {
        headers: response.headers,
        data: response.data,
      });
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          try {
            originalRequest.headers = { ...originalRequest.headers, RefreshToken: refreshToken };
            const { data } = await axiosInstance.post("/auth/refresh", originalRequest);
            originalRequest.headers = { ...originalRequest.headers, AccessToken: data.accessToken };
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token renewal failed:", refreshError);
            reqLogin();
            return Promise.reject(refreshError);
          }
        } else {
          reqLogin();
        }
      }
      return Promise.reject(error);
    },
  );
};

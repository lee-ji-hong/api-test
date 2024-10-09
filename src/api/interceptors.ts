import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "./authUtils";

export const setupInterceptors = (
  axiosInstance: AxiosInstance,
  setLoading: (loading: boolean) => void,
  setLogin: (isLoginNeed: boolean) => void,
) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
      });
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      setLoading(false);
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      console.log(`[Response] ${response.status} ${response.config.url}`, {
        headers: response.headers,
        data: response.data,
      });
      return response;
    },
    async (error: AxiosError) => {
      setLoading(false);
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          try {
            setLoading(true);
            originalRequest.headers = { ...originalRequest.headers, RefreshToken: refreshToken };
            const { data } = await axiosInstance.post("/auth/refresh", originalRequest);
            originalRequest.headers = { ...originalRequest.headers, AccessToken: data.accessToken };
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token renewal failed:", refreshError);
            console.error("Refresh token is not available.");
            setLogin(true);

            return Promise.reject(refreshError);
          } finally {
          }
        } else {
          console.error("Refresh token is not available.");
          setLogin(true);
        }
      }
      return Promise.reject(error);
    },
  );
};

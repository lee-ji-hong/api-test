import { LOGIN_REDIRECT } from "@/constants/loginLanding";
import { setAdviceReportData, setCommunityIdAfterLogin, setLoginRedirectPath } from "@/utils/localStorage";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "./authUtils";

function setRedirectPathAfterLogin(config: AxiosRequestConfig) {
  console.log("config.url", config.url);

  switch (true) {
    // 커뮤니티 디테일 페이지로 리다이렉트
    case config.url?.includes("/api/v1/post/"):
      if (!config.url?.includes("sorted")) {
        setLoginRedirectPath(LOGIN_REDIRECT.get("COMMUNITY_DETAIL"));
        const match = config.url?.match(/\/post\/(\d+)/);
        if (match) {
          const number = Number(match[1]);
          setCommunityIdAfterLogin(number);
        }
      } else {
        // 커뮤니티 페이지로 리다이렉트
        setLoginRedirectPath(LOGIN_REDIRECT.get("COMMUNITY_PAGE"));
      }
      break;

    // 글쓰기 페이지로 리다이렉트
    case config.url?.includes("health-check"):
      setLoginRedirectPath(LOGIN_REDIRECT.get("COMMUNITY_WRITE"));
      break;

    // 메인페이지 페이지로 리다이렉트
    case window.location.pathname === "/deposit-entry":
      setLoginRedirectPath(LOGIN_REDIRECT.get("DEPOSIT_ENTRY"));
      break;

    // 리포트 결과 페이지로 리다이렉트
    case window.location.pathname === "/loan-info-entry": {
      const jsonString = JSON.stringify(config.data);
      setAdviceReportData(jsonString);
      setLoginRedirectPath(LOGIN_REDIRECT.get("LOAN_ADVICE"));
      break;
    }

    default:
      console.log("해당 조건에 맞는 처리가 없습니다.");
      break;
  }
}

export const setupInterceptors = (
  axiosInstance: AxiosInstance,
  setLoading: (loading: boolean) => void,
  setLogin: (isLoginNeed: boolean) => void,
) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      setRedirectPathAfterLogin(config);

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

      // refresh 요청 자체에서 발생한 401은 바로 로그인 페이지로
      if (originalRequest.url?.includes("/auth/refresh")) {
        setLogin(true);
        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          try {
            setLoading(true);
            const { data } = await axiosInstance.post("/auth/refresh", null, {
              headers: { RefreshToken: refreshToken },
            });

            originalRequest.headers = {
              ...originalRequest.headers,
              AccessToken: data.accessToken,
            };
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token renewal failed:", refreshError);
            setLogin(true);
            return Promise.reject(refreshError);
          } finally {
            setLoading(false);
          }
        } else {
          console.error("Refresh token is not available.");
          setLogin(true);
          return Promise.reject(new Error("Refresh token not available"));
        }
      }
      return Promise.reject(error);
    },
  );
};

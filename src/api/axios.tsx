import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

class Axios {
  static instance: AxiosInstance | null | undefined = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: "http://52.78.180.147:8080/",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.instance.defaults.withCredentials = true;

      this.instance.interceptors.request.use(
        (config) => {
          // 요청을 보내기 전에 실행할 로직 추가 가능
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      // 응답 인터셉터 추가
      this.instance.interceptors.response.use(
        (response) => {
          // 응답이 성공적일 때 처리할 로직
          return response;
        },
        async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

          // 401 Unauthorized 에러 처리
          if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재요청 방지 플래그 설정

            const refreshToken = this.getCookie("refreshToken");
            if (refreshToken) {
              try {
                // 리프레시 토큰으로 새로운 액세스 토큰 요청
                const { data } = await this.instance!.post("/auth/refresh-token", {
                  refreshToken,
                });

                // 새로운 액세스 토큰을 쿠키에 저장
                this.setCookie("accessToken", data.accessToken);

                // 기존 요청의 Authorization 헤더에 새 토큰 설정
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${data.accessToken}`,
                };

                // 기존 요청을 새로운 액세스 토큰으로 재시도
                return this.instance!(originalRequest);
              } catch (refreshError) {
                console.error("리프레시 토큰 갱신 실패:", refreshError);
                // 리프레시 토큰도 만료되었거나 문제가 생긴 경우 로그아웃 등 처리
                return Promise.reject(refreshError);
              }
            }
          }
          // 401 이외의 에러는 그대로 처리
          return Promise.reject(error);
        },
      );
    }
    return this.instance;
  }

  // GET 요청
  static get(url: string, withToken = false) {
    const config: AxiosRequestConfig = {
      headers: {
        ...(this.getInstance().defaults.headers as RawAxiosRequestHeaders),
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }

    return this.getInstance().get(url, config);
  }

  // POST 요청
  static post(url: string, data: unknown, withToken = false) {
    const config: any = {
      headers: {
        ...this.getInstance().defaults.headers, // 기존 헤더 유지
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return this.getInstance().post(url, data, config);
  }

  static getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  static setCookie = (name: string, value: string): void => {
    // 쿠키 설정 (Secure, HttpOnly는 서버 측에서만 가능하므로 설명 참고)
    document.cookie = `${name}=${encodeURIComponent(value)};`;
  };
}

export default Axios;

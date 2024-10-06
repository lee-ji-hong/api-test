import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

// AxiosRequestConfig을 확장하여 커스텀 헤더 추가
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers?:
    | {
        AccessToken?: string | null;
        RefreshToken?: string | null;
      }
    | RawAxiosRequestHeaders;
}

class Axios {
  static instance: AxiosInstance | null | undefined = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL,
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.instance.defaults.withCredentials = true;

      this.instance.interceptors.request.use(
        (config) => {
          // 요청 시 로그 출력
          console.log(`[Request] ${config.method?.toUpperCase()} ${import.meta.env.VITE_BASE_URL}${config.url}`, {
            headers: config.headers,
            data: config.data,
          });
          return config;
        },
        (error) => {
          console.log("에러가 났습니다");
          return Promise.reject(error);
        },
      );

      // 응답 인터셉터 추가
      this.instance.interceptors.response.use(
        (response) => {
          // 응답 시 로그 출력
          console.log(`[Response] ${response.status} ${import.meta.env.VITE_BASE_URL}${response.config.url}`, {
            headers: response.headers,
            data: response.data,
          });
          return response;
        },
        async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

          // 401 Unauthorized 에러 처리
          if (error.response?.status === 401 && !originalRequest._retry) {
            console.log("401뜸");
            originalRequest._retry = true; // 재요청 방지 플래그 설정

            const refreshToken = this.getCookie("refreshToken");

            if (refreshToken) {
              try {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  RefreshToken: refreshToken,
                };

                const { data } = await this.instance!(originalRequest);

                originalRequest.headers = {
                  ...originalRequest.headers,
                  AccessToken: data.accessToken,
                  RefreshToken: null,
                };

                // 기존 요청을 새로운 액세스 토큰으로 재시도
                return this.instance!(originalRequest);
              } catch (refreshError) {
                console.error("리프레시 토큰 갱신 실패:", refreshError);
                // 리프레시 토큰도 만료되었거나 문제가 생긴 경우 로그아웃 등 처리
                // reqLogin();
                return Promise.reject(refreshError);
              }
            } else {
              // 리프레시 토큰이 없는 경우 로그인 페이지로 이동
              // reqLogin();
              // console.log("로그인 페이지로 이동");
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
  static get<T = unknown>(url: string, withToken = false) {
    const config: AxiosRequestConfig = {
      headers: {
        ...(this.getInstance().defaults.headers as RawAxiosRequestHeaders),
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        config.headers!.AccessToken = `${token}`;
      }
    }

    return this.getInstance()
      .get<T>(url, config)
      .then((response) => response.data);
  }

  // POST 요청
  static post<T = unknown>(url: string, data: unknown, withToken = false) {
    const config = {
      headers: {
        ...this.getInstance().defaults.headers, // 기존 헤더 유지
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      console.log("Access Token:", token);
      if (token) {
        config.headers!.AccessToken = token;
        config.headers!.RefreshToken = null;
      }
    }

    return this.getInstance()
      .post<T>(url, data, config as AxiosRequestConfig)
      .then((response) => response.data);
  }

  // PUT 요청
  static put<T = unknown>(url: string, data: unknown, withToken = false) {
    const config = {
      headers: {
        ...this.getInstance().defaults.headers,
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        config.headers!.AccessToken = token;
        config.headers!.RefreshToken = null;
      }
    }

    return this.getInstance()
      .put<T>(url, data, config as AxiosRequestConfig)
      .then((response) => response.data);
  }

  // POST 요청 (Multipart Form Data)
  static postMultipart(url: string, formData: FormData) {
    const token = this.getCookie("accessToken");
    const config: CustomAxiosRequestConfig = {
      headers: {
        ...this.getInstance().defaults.headers,
        "Content-Type": "multipart/form-data", // Ensure the request is treated as multipart/form-data
        AccessToken: "",
        RefreshToken: null,
      },
    };
    if (token) {
      config.headers!.AccessToken = token;
      config.headers!.RefreshToken = null;
    }
    return this.getInstance().post(url, formData, config as CustomAxiosRequestConfig);
  }

  // POST 요청 (Multipart Form Data)
  static putMultipart(url: string, formData: FormData) {
    const token = this.getCookie("accessToken");
    const config: CustomAxiosRequestConfig = {
      headers: {
        ...this.getInstance().defaults.headers,
        "Content-Type": "multipart/form-data", // Ensure the request is treated as multipart/form-data
        AccessToken: "",
        RefreshToken: null,
      },
    };
    if (token) {
      config.headers!.AccessToken = token;
      config.headers!.RefreshToken = null;
    }
    return this.getInstance().put(url, formData, config as CustomAxiosRequestConfig);
  }

  static delete<T = unknown>(url: string, withToken = false) {
    const config = {
      headers: {
        ...this.getInstance().defaults.headers,
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        config.headers!.AccessToken = token;
        config.headers!.RefreshToken = null;
      }
    }

    return this.getInstance()
      .delete<T>(url, config as AxiosRequestConfig)
      .then((response) => response.data);
  }

  // 쿠키에서 특정 값을 가져오는 함수
  static getCookie = (name: string): string | null => {
    const cookieArr = document.cookie.split("; "); // 쿠키를 각각의 key=value 쌍으로 분리
    console.log(cookieArr);
    for (const cookie of cookieArr) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue); // 쿠키 값이 있으면 반환
      }
    }
    return null; // 쿠키가 없을 경우 null 반환
  };

  static setCookie = (name: string, value: string): void => {
    // 쿠키 설정 (Secure, HttpOnly는 서버 측에서만 가능하므로 설명 참고)
    document.cookie = `${name}=${encodeURIComponent(value)};`;
  };
}

export default Axios;

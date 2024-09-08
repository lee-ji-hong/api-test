import axios, { AxiosInstance } from "axios";

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
    }
    return this.instance;
  }

  // GET 요청
  static get(url: string, withToken = false) {
    const config: any = {
      headers: {
        ...this.getInstance().defaults.headers, // 기존 헤더 유지
      },
    };

    if (withToken) {
      const token = this.getCookie("accessToken");
      if (token) {
        // 기존 헤더에 Authorization 헤더 추가
        config.headers.Authorization = `Bearer ${token}`;
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
}

export default Axios;

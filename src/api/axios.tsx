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

  static get(url: string) {
    return this.getInstance().get(url);
  }

  static post(url: string, data: unknown) {
    return this.getInstance().post(url, data);
  }

  static getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };
}

export default Axios;

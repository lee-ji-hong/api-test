import axios, { AxiosInstance, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { getCookie } from "./authUtils";
import { setupInterceptors } from "./interceptors";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  headers?: {
    AccessToken?: string | null;
    RefreshToken?: string | null;
  } & RawAxiosRequestHeaders;
}

class Axios {
  private static instance: AxiosInstance | null = null;
  private static readonly BASE_URL = import.meta.env.VITE_APP_BASE_URL; // 기본 URL을 상수로 설정
  private static readonly CONTENT_TYPE_JSON = "application/json";
  private static readonly CONTENT_TYPE_MULTIPART = "multipart/form-data";
  // private static readonly RETRY_HEADER = "_retry";
  private static setLoading: ((loading: boolean) => void) | null = null;
  private static setLogin: ((loading: boolean) => void) | null = null;

  private constructor() {} // 인스턴스 생성 방지

  static setLoadingFunction(setLoading: (loading: boolean) => void) {
    if (!this.setLoading) {
      this.setLoading = setLoading;
    }
  }

  static setLoginFunction(setLogin: (isLoginNeed: boolean) => void) {
    if (!this.setLogin) {
      this.setLogin = setLogin;
    }
  }

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.BASE_URL,
        headers: { "Content-Type": this.CONTENT_TYPE_JSON },
        withCredentials: true,
      });

      setupInterceptors(
        this.instance,
        this.setLoading as (loading: boolean) => void,
        this.setLogin as (isLoginNeed: boolean) => void,
      );
    }
    return this.instance;
  }

  private static getHeaders(withToken: boolean, additionalHeaders?: RawAxiosRequestHeaders): RawAxiosRequestHeaders {
    const headers: RawAxiosRequestHeaders = {
      "Content-Type": this.CONTENT_TYPE_JSON,
    };
    if (withToken) {
      const token = getCookie("accessToken");
      if (token) headers.AccessToken = token;
    }

    // 추가적인 헤더들을 덮어씌우기
    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders);
    }

    return headers;
  }

  /**
   * GET 요청
   * @param url
   * @param withToken
   * @param additionalHeaders
   * @returns Promise<T>
   */
  static async get<T>(url: string, withToken = false, additionalHeaders?: RawAxiosRequestHeaders): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .get<T>(url, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청
   * @param url
   * @param data
   * @param withToken
   * @param additionalHeaders
   * @returns Promise<T>
   */
  static async post<T>(
    url: string,
    data: unknown,
    withToken = false,
    additionalHeaders?: RawAxiosRequestHeaders,
  ): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @param additionalHeaders
   * @returns Promise<CustomAxiosRequestConfig>
   */
  static async postMultipart(
    url: string,
    formData: FormData,
    additionalHeaders?: RawAxiosRequestHeaders,
  ): Promise<CustomAxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeaders(true, additionalHeaders),
        "Content-Type": this.CONTENT_TYPE_MULTIPART,
      },
    };
    return this.getInstance().post(url, formData, config);
  }

  /**
   * PUT 요청
   * @param url
   * @param data
   * @param withToken
   * @param additionalHeaders
   * @returns Promise<T>
   */
  static async put<T>(
    url: string,
    data: unknown,
    withToken = false,
    additionalHeaders?: RawAxiosRequestHeaders,
  ): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .put<T>(url, data, config)
      .then((response) => response.data);
  }

  /**
   * PUT 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @param additionalHeaders
   * @returns Promise<CustomAxiosRequestConfig>
   */
  static async putMultipart(
    url: string,
    formData: FormData,
    additionalHeaders?: RawAxiosRequestHeaders,
  ): Promise<CustomAxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeaders(true, additionalHeaders),
        "Content-Type": this.CONTENT_TYPE_MULTIPART,
      },
    };
    return this.getInstance().put(url, formData, config);
  }

  /**
   * DELETE 요청
   * @param url
   * @param withToken
   * @param additionalHeaders
   * @returns Promise<T>
   */
  static async delete<T>(url: string, withToken = false, additionalHeaders?: RawAxiosRequestHeaders): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken, additionalHeaders) };
    return this.getInstance()
      .delete<T>(url, config)
      .then((response) => response.data);
  }
}

export default Axios;

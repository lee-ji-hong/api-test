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

  private constructor() {} // 인스턴스 생성 방지

  static setLoadingFunction(setLoading: (loading: boolean) => void) {
    if (!this.setLoading) {
      this.setLoading = setLoading;
    }
  }

  static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.BASE_URL,
        headers: { "Content-Type": this.CONTENT_TYPE_JSON },
        withCredentials: true,
      });

      setupInterceptors(this.instance, this.setLoading as (loading: boolean) => void);
    }
    return this.instance;
  }

  private static getHeaders(withToken: boolean): RawAxiosRequestHeaders {
    const headers: RawAxiosRequestHeaders = {
      "Content-Type": this.CONTENT_TYPE_JSON,
    };
    if (withToken) {
      const token = getCookie("accessToken");
      if (token) headers.AccessToken = token;
    }
    return headers;
  }

  /**
   * GET 요청
   * @param url
   * @param withToken
   * @returns
   */
  static async get<T>(url: string, withToken = false): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken) };
    return this.getInstance()
      .get<T>(url, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청
   * @param url
   * @param data
   * @param withToken
   * @returns
   */
  static async post<T>(url: string, data: unknown, withToken = false): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken) };
    return this.getInstance()
      .post<T>(url, data, config)
      .then((response) => response.data);
  }

  /**
   * POST 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @returns
   */
  static async postMultipart(url: string, formData: FormData): Promise<CustomAxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeaders(true),
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
   * @returns
   */
  static async put<T>(url: string, data: unknown, withToken = false): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken) };
    return this.getInstance()
      .put<T>(url, data, config)
      .then((response) => response.data);
  }

  /**
   * PUT 요청 (multipart/form-data)
   * @param url
   * @param formData
   * @returns
   */
  static async putMultipart(url: string, formData: FormData): Promise<CustomAxiosRequestConfig> {
    const config: AxiosRequestConfig = {
      headers: {
        ...this.getHeaders(true),
        "Content-Type": this.CONTENT_TYPE_MULTIPART,
      },
    };
    return this.getInstance().put(url, formData, config);
  }

  /**
   * DELETE 요청
   * @param url
   * @param withToken
   * @returns
   */
  static async delete<T>(url: string, withToken = false): Promise<T> {
    const config: AxiosRequestConfig = { headers: this.getHeaders(withToken) };
    return this.getInstance()
      .delete<T>(url, config)
      .then((response) => response.data);
  }
}

export default Axios;

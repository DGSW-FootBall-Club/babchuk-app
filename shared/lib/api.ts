import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { useTokenStore } from "@/shared/store/tokenStore";
import type { BaseResponse } from "@/entities/common/BaseResponse";
import type { ReissueResponse } from "@/entities/auth/types/response/ReissueResponse";

const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let waiters: Array<(token: string | null) => void> = [];

const notify = (token: string | null) => {
  waiters.forEach((cb) => cb(token));
  waiters = [];
};

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = useTokenStore.getState();
  if (!refreshToken) return null;
  try {
    const { data } = await axios.post<BaseResponse<ReissueResponse>>(
      `${baseURL}/auth/reissue`,
      { refreshToken },
    );
    useTokenStore.getState().setTokens(data.data);
    return data.data.accessToken;
  } catch {
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        waiters.push((token) => {
          if (!token) {
            reject(error);
            return;
          }
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }
    isRefreshing = true;

    const newToken = await refreshAccessToken();
    isRefreshing = false;

    notify(newToken);
    if (!newToken) {
      useTokenStore.getState().clearToken();
      return Promise.reject(error);
    }

    original.headers.Authorization = `Bearer ${newToken}`;
    return api(original);
  },
);

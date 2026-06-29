import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import type { ApiEnvelope } from "@/services/types/api";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "@/lib/auth/token";
import { redirectToLogin } from "@/lib/auth/session";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && original && !original._retry) {
      const hadSession = Boolean(getRefreshToken());
      if (!hadSession) {
        return Promise.reject(error);
      }

      original._retry = true;
      refreshPromise ??= refreshAccessToken();
      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken && original.headers) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(original);
      }

      clearTokens();
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

/** Unwrap `{ success, data }` envelope from API responses */
export function unwrap<T>(response: AxiosResponse<ApiEnvelope<T>>): T {
  return response.data.data;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken || !API_BASE_URL) return null;

  try {
    const { data } = await axios.post<ApiEnvelope<{ accessToken: string; refreshToken: string }>>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken }
    );
    setTokens(data.data.accessToken, data.data.refreshToken);
    return data.data.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

export function hasApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

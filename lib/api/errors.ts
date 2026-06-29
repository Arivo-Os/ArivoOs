import type { AxiosError } from "axios";
import type { ApiErrorBody } from "@/lib/api/types/api";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof Error && !isAxiosError(error)) return error.message;
  const axiosError = error as AxiosError<ApiErrorBody>;
  return axiosError.response?.data?.error?.message ?? fallback;
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

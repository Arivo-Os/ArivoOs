/** Unwrap list payloads whether the API returns a bare array or nested keys. */
export function normalizeList<T = unknown>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["items", "conversations", "history", "decisions", "records", "data"]) {
      const nested = obj[key];
      if (Array.isArray(nested)) return nested as T[];
    }
  }
  return [];
}

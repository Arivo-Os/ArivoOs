import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import { mockUser } from "@/lib/api/mock-data";
import { getApiErrorMessage } from "@/lib/api/errors";
import { getAccessToken, setTokens, clearTokens } from "@/lib/auth/token";
import { normalizePhone } from "@/lib/utils/phone";
import type { AuthTokenResponse, SendOtpResponse, UserProfile, VerifyOtpResponse } from "@/lib/api/types/api";
import type { User } from "@/lib/types";

function mapUser(profile: UserProfile | { fullName?: string; name?: string }): User {
  const p = profile as UserProfile;
  return {
    id: p.id,
    name: p.fullName ?? "Arivo User",
    email: p.email,
    phone: p.phone,
  };
}

function completeAuth(data: AuthTokenResponse): { user: User; isNewUser: boolean } {
  setTokens(data.accessToken, data.refreshToken);
  return { user: mapUser(data.user), isNewUser: data.isNewUser };
}

export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  const normalized = normalizePhone(phone);
  if (!hasApiConfigured()) {
    if (!normalized.trim()) throw new Error("Phone number is required");
    return { message: "OTP sent", phone: normalized, expiresIn: 300, channel: "dev", otp: "2222" };
  }
  const res = await apiClient.post("/auth/send-otp", { phone: normalized });
  return unwrap(res);
}

export async function verifyOtp(phone: string, otp: string): Promise<{ user: User; isNewUser: boolean }> {
  const normalized = normalizePhone(phone);
  if (!hasApiConfigured()) {
    if (otp.length < 4) throw new Error("Invalid OTP");
    setTokens("mock-access-token", "mock-refresh-token");
    return { user: mockUser, isNewUser: false };
  }
  const res = await apiClient.post("/auth/verify-otp", { phone: normalized, otp });
  const data = unwrap(res) as VerifyOtpResponse;
  return completeAuth(data);
}

export async function loginWithGoogle(idToken: string): Promise<{ user: User; isNewUser: boolean }> {
  if (!idToken.trim()) throw new Error("Google sign-in failed");
  if (!hasApiConfigured()) {
    setTokens("mock-access-token", "mock-refresh-token");
    return { user: { ...mockUser, name: "Google User", email: "google.user@example.com" }, isNewUser: false };
  }
  try {
    const res = await apiClient.post("/auth/google", { idToken });
    const data = unwrap(res) as AuthTokenResponse;
    return completeAuth(data);
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404) {
      throw new Error("Google sign-in is not enabled on the server yet. Please use phone OTP.");
    }
    throw error;
  }
}

export async function getUserProfile(): Promise<User> {
  if (!hasApiConfigured()) {
    if (!getAccessToken()) throw new Error("Not authenticated");
    return mockUser;
  }
  const res = await apiClient.get("/users/profile");
  const profile = unwrap(res) as UserProfile;
  return mapUser(profile);
}

export async function logoutApi(): Promise<void> {
  if (hasApiConfigured()) {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // still clear local session
    }
  }
  clearTokens();
}

export { getApiErrorMessage };

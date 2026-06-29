"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GuestOnly } from "@/components/auth/GuestOnly";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { loginWithGoogle, getApiErrorMessage } from "@/services/auth.service";
import { isGoogleSignInEnabled } from "@/lib/auth/google-config";
import { useAuth } from "@/features/auth/context/auth-context";
import { getPostLoginPath } from "@/lib/auth/routes";
import { AlertTriangle, ArrowLeft, Lock, Loader2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleEnabled = isGoogleSignInEnabled();

  const finishLogin = async () => {
    await refreshUser();
    router.push(getPostLoginPath(searchParams.get("next")));
  };

  const onGoogleCredential = async (idToken: string) => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle(idToken);
      await finishLogin();
    } catch (err) {
      setError(getApiErrorMessage(err, "Google sign-in failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] dark:bg-[#16181d] px-4 py-12 transition-colors duration-300">
      {/* Subtle radial green glow at the top behind the card */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(0,166,126,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,200,150,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      {/* Home link */}
      <div className="relative z-10 w-full max-w-[420px] mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#5a6070] dark:text-[#4a5168] transition-colors hover:text-[#111318] dark:hover:text-[#e8eaf0] hover:bg-[#e4e6ed]/40 dark:hover:bg-[#1c1f26]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] animate-fade-in rounded-2xl border border-[#e4e6ed] dark:border-[#2a2e3a] bg-white dark:bg-[#1c1f26] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300">
        
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm dark:bg-[#1c1f26]/80">
            <Loader2 className="h-8 w-8 animate-spin text-[#00a67e]" />
            <p className="mt-3 text-sm font-semibold text-[#111318] dark:text-[#e8eaf0]">Signing in...</p>
          </div>
        )}

        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#00c896] to-[#00a67e] text-2xl font-black text-white shadow-[0_8px_20px_rgba(0,200,150,0.25)] dark:shadow-[0_0_0_6px_rgba(0,200,150,0.08)] transition-transform duration-300 hover:scale-105">
            A
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-display text-xl font-semibold text-[#111318] dark:text-[#e8eaf0]">
            Sign in to Arivo
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#00a67e] dark:text-[#00c896]">
            Your Financial OS
          </p>
          <p className="mt-1 text-xs text-[#9aa0b0] dark:text-[#4a5168]">
            Continue with Google to get started
          </p>
        </div>

        <div className="h-px bg-[#f0f1f4] dark:bg-[#21242d] w-full mb-5" />

        {/* Google sign-in */}
        <div className="space-y-3">
          {googleEnabled ? (
            <>
              <div className="rounded-xl border border-[#e4e6ed] dark:border-[#2a2e3a] bg-[#f8f9fb] dark:bg-[#21242d] hover:border-[#00a67e]/40 dark:hover:border-[#00c896]/50 hover:bg-[#f0fdf8] dark:hover:bg-[#21242d]/80 transition-all duration-200 overflow-hidden">
                <GoogleSignInButton
                  onCredential={onGoogleCredential}
                  onError={setError}
                  disabled={loading}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9aa0b0] dark:text-[#3d4455] font-medium">
                <Lock className="h-3 w-3 shrink-0" />
                <span>Google account used only for secure sign-in</span>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-[#9aa0b0] dark:text-[#4a5168]">
              Google Sign-In is currently disabled or not configured.
            </p>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger">
            {error}
          </p>
        )}

        {/* Terms */}
        <p className="mt-5 text-center text-[11px] text-[#9aa0b0] dark:text-[#3d4455] leading-relaxed">
          By continuing you agree to our{" "}
          <Link href="/terms/" className="text-[#00a67e] dark:text-[#00c896] hover:underline font-semibold transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy/" className="text-[#00a67e] dark:text-[#00c896] hover:underline font-semibold transition-colors">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Beta notice */}
        <div className="mt-5 rounded-xl border border-[#fde68a] dark:border-[rgba(245,166,35,0.2)] bg-[#fffbeb] dark:bg-[#1a1400] p-4 text-left leading-relaxed">
          <p className="font-semibold text-[#d97706] dark:text-[#f5a623] text-[13px] mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Beta notice
          </p>
          <p className="text-[11px] text-[#92400e] dark:text-[#7a6030] leading-normal font-medium">
            Arivo may generate inaccurate outputs. Verify financial decisions with a qualified advisor. Not SEBI-registered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] dark:bg-[#16181d] px-4 py-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(0,166,126,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,200,150,0.08),transparent_50%)]" />
          <div className="relative z-10 flex w-full max-w-[420px] animate-pulse flex-col items-center justify-center rounded-2xl border border-[#e4e6ed] dark:border-[#2a2e3a] bg-white dark:bg-[#1c1f26] p-12 shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-[#00a67e]" />
            <p className="text-sm font-semibold text-[#111318] dark:text-[#e8eaf0]">Preparing Arivo...</p>
          </div>
        </div>
      }
    >
      <GuestOnly>
        <LoginForm />
      </GuestOnly>
    </Suspense>
  );
}

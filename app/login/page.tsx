"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GuestOnly } from "@/components/auth/GuestOnly";
import { loginWithGoogle, getApiErrorMessage } from "@/lib/api/auth.service";
import { isGoogleSignInEnabled, loadGoogleIdentityScript } from "@/lib/auth/google-config";
import { useAuth } from "@/features/auth/context/auth-context";
import { getPostLoginPath } from "@/lib/auth/routes";
import { AlertTriangle, ArrowLeft, Lock, ChevronDown } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleEnabled = isGoogleSignInEnabled();

  useEffect(() => {
    if (googleEnabled) {
      loadGoogleIdentityScript().catch(() => {});
    }
  }, [googleEnabled]);

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

  const handleGoogleClick = () => {
    if (loading) return;
    // Programmatic Google Sign-In prompt if enabled and loaded, else fallback to mock login
    if (googleEnabled && typeof window !== "undefined" && window.google?.accounts?.id) {
      try {
        (window.google.accounts.id.prompt as any)((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            onGoogleCredential("mock-id-token");
          }
        });
      } catch {
        onGoogleCredential("mock-id-token");
      }
    } else {
      onGoogleCredential("mock-id-token");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f4f5f7] dark:bg-[#16181d] px-4 py-12 transition-colors duration-300">
      {/* Subtle radial green glow at the top behind the card */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(0,166,126,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(0,200,150,0.08),transparent_50%)]" 
        aria-hidden="true" 
      />

      <div className="relative z-10 w-full max-w-[420px] mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#5a6070] dark:text-[#4a5168] transition-colors hover:text-[#111318] dark:hover:text-[#e8eaf0] hover:bg-[#e4e6ed]/40 dark:hover:bg-[#1c1f26]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-[420px] animate-fade-in rounded-2xl border border-[#e4e6ed] dark:border-[#2a2e3a] bg-white dark:bg-[#1c1f26] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-300">
        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#00c896] to-[#00a67e] text-2xl font-black text-white shadow-[0_8px_20px_rgba(0,200,150,0.25)] dark:shadow-[0_0_0_6px_rgba(0,200,150,0.08)] transition-transform duration-300 hover:scale-105">
            A
          </div>
        </div>

        {/* Header content */}
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

        {/* Custom Google sign-in button */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleClick}
            disabled={loading}
            className="flex w-full items-center justify-between rounded-xl border border-[#e4e6ed] dark:border-[#2a2e3a] bg-[#f8f9fb] dark:bg-[#21242d] p-[11px_14px] transition-all duration-200 hover:border-[#00a67e]/40 dark:hover:border-[#00c896]/50 hover:bg-[#f0fdf8] dark:hover:bg-[#21242d]/80 disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              {/* Initials avatar */}
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00c896] to-[#00a67e] text-[11px] font-bold text-white">
                AG
              </div>
              <div className="text-left">
                <p className="text-[12.5px] font-semibold text-[#111318] dark:text-[#e2e4ea] leading-tight">
                  Continue as Akhilesh
                </p>
                <p className="text-[10.5px] text-[#9aa0b0] dark:text-[#4a5168] leading-none">
                  agiri5375@gmail.com
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* Google G icon */}
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-md bg-white p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              </div>
              <ChevronDown className="h-4 w-4 text-[#9aa0b0] dark:text-[#4a5168]" />
            </div>
          </button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9aa0b0] dark:text-[#3d4455] font-medium">
            <Lock className="h-3 w-3 shrink-0" />
            <span>Google account used only for secure sign-in</span>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger">
            {error}
          </p>
        )}

        {/* Terms Line */}
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

        {/* Beta notice box */}
        <div className="mt-5 rounded-xl border border-[#fde68a] dark:border-[rgba(245,166,35,0.2)] bg-[#fffbeb] dark:bg-[#1a1400] p-4 text-left leading-relaxed transition-all">
          <p className="font-semibold text-[#d97706] dark:text-[#f5a623] text-[13px] mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Beta notice
          </p>
          <p className="text-[11px] text-[#92400e] dark:text-[#7a6030] leading-normal font-medium">
            Arivo may generate inaccurate outputs. Verify financial decisions with a qualified advisor. Not SEBI-registered.
          </p>
        </div>
      </div>
      <p className="mt-8 text-[11px] text-[#9aa0b0] dark:text-[#4a5168] font-medium">
        This is part of a dual-mode design system. Light and dark versions share the same layout, card structure, and component sizes — only colors change.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#f4f5f7] dark:bg-[#16181d] flex min-h-screen items-center justify-center">
          <p className="text-sm text-[#9aa0b0] dark:text-[#4a5168]">Loading...</p>
        </div>
      }
    >
      <GuestOnly>
        <LoginForm />
      </GuestOnly>
    </Suspense>
  );
}

"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GuestOnly } from "@/components/auth/GuestOnly";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { loginWithGoogle, getApiErrorMessage } from "@/lib/api/auth.service";
import { isGoogleSignInEnabled } from "@/lib/auth/google-config";
import { useAuth } from "@/features/auth/context/auth-context";
import { getPostLoginPath } from "@/lib/auth/routes";
import { AlertTriangle, ArrowLeft, Lock } from "lucide-react";

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
    <div className="app-shell-bg flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-app-muted transition-colors hover:text-app-text hover:bg-app-card"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
      </div>
      <div className="w-full max-w-md animate-fade-in rounded-3xl border border-app-border bg-app-card p-8 shadow-app-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-transparent shadow-md transition-transform duration-300 hover:scale-105">
            <img src="/assets/logo-mark.svg" alt="Arivo Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="font-display text-display-sm text-app-text">
            Sign in to Arivo
          </h1>
          <p className="mt-1 text-sm font-medium text-app-accent/90">
            Your Financial OS.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-app-muted">
            Continue with Google to get started.
          </p>
        </div>

        <div className="space-y-4">
          {googleEnabled ? (
            <>
              <div className="relative rounded-xl border border-app-border/60 bg-app-bg/50 hover:border-app-accent/35 shadow-app-sm transition-all duration-300 p-0.5 hover:shadow-app-md flex items-center justify-center min-h-[48px] w-full">
                <GoogleSignInButton
                  onCredential={onGoogleCredential}
                  onError={setError}
                  disabled={loading}
                  className="w-full"
                />
              </div>
              <p className="mt-2 text-center text-[11px] font-medium text-app-muted/85 flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3 text-app-muted/80 shrink-0" />
                We only use your Google account for secure authentication.
              </p>
            </>
          ) : (
            <p className="text-center text-sm text-app-muted">Google Sign-In is currently disabled or not configured.</p>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger">
            {error}
          </p>
        )}

        <p className="mt-5 text-center text-[11px] text-app-muted/75">
          By continuing, you agree to our{" "}
          <Link href="/terms/" className="text-app-accent hover:underline hover:text-app-accent/90 transition-colors font-medium">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy/" className="text-app-accent hover:underline hover:text-app-accent/90 transition-colors font-medium">
            Privacy Policy
          </Link>
          .
        </p>

        <div className="mt-5 rounded-2xl border border-amber-500/12 bg-amber-500/[0.04] p-3.5 text-left text-[13px] leading-relaxed text-app-muted/95">
          <p className="font-bold text-amber-500 dark:text-amber-400 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
            Beta Notice
          </p>
          <p className="text-xs leading-normal">
            Arivo is currently in Beta and may occasionally generate inaccurate information. Please verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor.
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
        <div className="app-shell-bg flex min-h-screen items-center justify-center">
          <p className="text-sm text-app-muted">Loading...</p>
        </div>
      }
    >
      <GuestOnly>
        <LoginForm />
      </GuestOnly>
    </Suspense>
  );
}

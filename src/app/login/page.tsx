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
    <div className="relative flex min-h-screen flex-col items-center justify-center app-shell-bg px-4 py-12 transition-colors duration-300">
      {/* Subtle radial green glow at the top behind the card */}
      {/* Home link */}
      <div className="relative z-10 w-full max-w-[420px] mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-app-muted transition-colors hover:text-app-text hover:bg-app-surface"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-[420px] animate-fade-in rounded-2xl border border-app-border bg-app-surface p-8 shadow-card transition-all duration-300">

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-app-surface/80 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-app-accent" />
            <p className="mt-3 text-sm font-semibold text-app-text">Signing in...</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-display text-xl font-semibold text-app-text">
            Sign in to Arivo
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-app-accent">
            Your Financial OS
          </p>
          <p className="mt-1 text-xs text-app-muted">
            Continue with Google to Use Arivo
          </p>
        </div>

        <div className="h-px bg-app-border w-full mb-5" />

        {/* Google sign-in */}
        <div className="space-y-3">
          {googleEnabled ? (
            <>
              <div className="rounded-xl border border-app-border bg-app-bg hover:border-app-accent/40 hover:bg-app-card-hover transition-all duration-200 overflow-hidden">
                <GoogleSignInButton
                  onCredential={onGoogleCredential}
                  onError={setError}
                  disabled={loading}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-app-muted font-medium">
                <Lock className="h-3 w-3 shrink-0" />
                <span>Google account used only for secure sign-in</span>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-app-muted">
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
        <p className="mt-5 text-center text-[11px] text-app-muted leading-relaxed">
          By continuing you agree to our{" "}
          <Link href="/terms/" className="text-app-accent hover:underline font-semibold transition-colors">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy/" className="text-app-accent hover:underline font-semibold transition-colors">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Beta notice */}
        <div className="mt-5 rounded-xl border border-app-warning/30 bg-app-warning/10 p-4 text-left leading-relaxed">
          <p className="font-semibold text-app-warning text-[13px] mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Beta notice
          </p>
          <p className="text-[11px] text-app-warning opacity-90 leading-normal font-medium">
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
        <div className="relative flex min-h-screen flex-col items-center justify-center app-shell-bg px-4 py-12">
          <div className="relative z-10 flex w-full max-w-[420px] animate-pulse flex-col items-center justify-center rounded-2xl border border-app-border bg-app-surface p-12 shadow-card">
            <Loader2 className="mb-4 h-8 w-8 animate-spin text-app-accent" />
            <p className="text-sm font-semibold text-app-text">Preparing Arivo...</p>
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

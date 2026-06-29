"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/features/theme/theme-context";
import {
  getGoogleClientId,
  isGoogleSignInEnabled,
  loadGoogleIdentityScript,
} from "@/lib/auth/google-config";
import { cn } from "@/lib/utils";

interface GoogleSignInButtonProps {
  onCredential: (idToken: string) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

export function GoogleSignInButton({
  onCredential,
  onError,
  disabled = false,
  className,
}: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);
  const { isDark } = useTheme();
  const clientId = getGoogleClientId();

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!clientId || !containerRef.current || disabled) return;

    let cancelled = false;

    loadGoogleIdentityScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.google?.accounts?.id) return;

        containerRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              onCredentialRef.current(response.credential);
              return;
            }
            onErrorRef.current?.("Google sign-in was cancelled. Try again.");
          },
        });

        const width = Math.max(containerRef.current.offsetWidth, 280);

        window.google.accounts.id.renderButton(containerRef.current, {
          type: "standard",
          theme: isDark ? "filled_black" : "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: Math.min(width, 400),
        });
      })
      .catch(() => {
        onErrorRef.current?.("Could not load Google Sign-In. Check your connection.");
      });

    return () => {
      cancelled = true;
    };
  }, [clientId, disabled, isDark]);

  if (!isGoogleSignInEnabled()) return null;

  return (
    <div
      className={cn(
        "flex w-full justify-center",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <div ref={containerRef} className="min-h-[44px] w-full" />
    </div>
  );
}

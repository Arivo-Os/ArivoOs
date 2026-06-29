"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";
import { getPostLoginPath } from "@/lib/auth/routes";

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (!isLoading) setAuthReady(true);
  }, [isLoading]);

  useEffect(() => {
    if (authReady && isAuthenticated) {
      router.replace(getPostLoginPath(searchParams.get("next")));
    }
  }, [authReady, isAuthenticated, router, searchParams]);

  if (!authReady) {
    return (
      <div className="app-shell-bg flex min-h-screen items-center justify-center">
        <p className="text-sm text-app-muted">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="app-shell-bg flex min-h-screen items-center justify-center">
        <p className="text-sm text-app-muted">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { usePathname } from "next/navigation";
import { AppMobileNav, AppSidebar, AppTopBar } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { SidebarProvider } from "@/components/app/SidebarContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <AppLayoutInner>{children}</AppLayoutInner>
      </SidebarProvider>
    </RequireAuth>
  );
}

function AppLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVeris = pathname.startsWith("/veris");

  return (
    <div className="app-shell-bg flex h-screen overflow-hidden text-app-text">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className={isVeris ? "lg:hidden" : ""}>
          <AppTopBar />
        </div>
        {isVeris ? (
          /* Veris gets full-screen, no padding, no max-width */
          <main className="flex-1 overflow-hidden">
            <div key={pathname} className="animate-fade-in h-full">{children}</div>
          </main>
        ) : (
          /* Other pages keep normal padding */
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-8">
            <div key={pathname} className="animate-fade-in w-full max-w-[1600px] mx-auto">{children}</div>
          </main>
        )}
      </div>
      <AppMobileNav />
    </div>
  );
}

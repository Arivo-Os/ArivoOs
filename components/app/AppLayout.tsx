"use client";

import { AppMobileNav, AppSidebar, AppTopBar } from "@/components/app/AppShell";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { SidebarProvider } from "@/components/app/SidebarContext";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <div className="app-shell-bg flex min-h-screen text-app-text">
          <AppSidebar />
          <div className="flex min-h-screen flex-1 flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            <AppTopBar />
            <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
              <div className="animate-fade-in mx-auto max-w-6xl">{children}</div>
            </main>
          </div>
          <AppMobileNav />
        </div>
      </SidebarProvider>
    </RequireAuth>
  );
}

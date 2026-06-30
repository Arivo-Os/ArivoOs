"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Route,
  Vault,
  Settings,
  LogOut,
  Bell,
  User,
  History,
  Plus,
  Trash2,
  Loader2,
  Menu,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/context/auth-context";
import { useSidebar } from "@/components/app/SidebarContext";

const navItems = [
  { href: "/life/", label: "Dashboard", icon: Home },
  { href: "/vault/", label: "Profile", icon: Vault },
  { href: "/journey/", label: "Goals & Activity", icon: Route },
  { href: "/veris/", label: "Veris AI", icon: MessageSquare },
  { href: "/settings/", label: "Settings", icon: Settings },
];



function formatWhen(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const {
    isCollapsed,
    toggleSidebar,
    conversations,
    activeSessionId,
    setActiveSessionId,
    loadingHistory,
    onNewChat,
    onDeleteConversation,
  } = useSidebar();
  const isVeris = pathname.startsWith("/veris");

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-app-border bg-app-surface/80 backdrop-blur-xl lg:flex transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[60px]" : "w-[260px]"
      )}
    >
      {/* Toggle + Logo row */}
      <div
        className={cn(
          "flex h-16 items-center border-b border-app-border shrink-0",
          isCollapsed ? "justify-center px-0" : "gap-3 px-4 justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div>
              <span className="block text-base font-bold tracking-tight text-app-text">Arivo</span>
              <span className="text-[11px] text-app-muted">Your Money, Organized.</span>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex items-center justify-center rounded-xl border border-app-border bg-app-card text-app-muted hover:text-app-text hover:bg-app-card-hover transition-colors",
            isCollapsed ? "h-9 w-9" : "h-8 w-8 shrink-0"
          )}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className={cn("flex flex-col gap-1 p-2", isCollapsed && "items-center")} aria-label="App navigation">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isCollapsed ? "justify-center w-10 px-0" : "",
                active
                  ? "bg-app-accent-muted text-app-accent shadow-app-sm"
                  : "text-app-muted hover:bg-app-card hover:text-app-text"
              )}
            >
              {active && !isCollapsed && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-app-accent" />
              )}
              <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-app-accent")} aria-hidden="true" />
              {!isCollapsed && (
                <>
                  {item.label}
                  {item.label === "Veris AI" && (
                    <span className="ml-auto rounded-full bg-app-accent px-1.5 py-0.5 text-[9px] font-extrabold text-app-bg uppercase tracking-wide">
                      AI
                    </span>
                  )}
                </>
              )}
              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-app-border bg-app-surface px-2.5 py-1 text-xs font-medium text-app-text shadow-app-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>


      {/* Veris history — only when expanded */}
      {isVeris && !isCollapsed && (
        <div className="flex-1 flex flex-col border-t border-app-border/45 overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <div className="flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-app-accent" />
              <span className="text-xs font-bold text-app-text uppercase tracking-wider">History</span>
            </div>
            {onNewChat && (
              <button
                type="button"
                onClick={onNewChat}
                className="inline-flex items-center gap-0.5 rounded-lg px-2 py-0.5 text-[10px] font-medium text-app-accent hover:bg-app-accent-muted transition-colors"
              >
                <Plus className="h-3 w-3" />
                New
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-1 scrollbar-thin">
            {loadingHistory && (
              <div className="flex items-center justify-center gap-2 py-6 text-xs text-app-muted">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading…
              </div>
            )}

            {!loadingHistory && conversations.length === 0 && (
              <p className="px-2 py-4 text-center text-xs text-app-muted leading-relaxed">
                No past chats yet.
              </p>
            )}

            {!loadingHistory &&
              conversations.map((c) => {
                const active = c.sessionId === activeSessionId;
                return (
                  <div
                    key={c.sessionId}
                    className={cn(
                      "group relative flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all duration-200 hover:translate-x-0.5",
                      active
                        ? "bg-app-accent-muted text-app-text font-medium"
                        : "text-app-muted hover:bg-app-card hover:text-app-text"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSessionId(c.sessionId);
                      }}
                      className="flex-1 text-left pr-6 overflow-hidden"
                    >
                      <p className="truncate text-xs">{c.title}</p>
                      {c.updatedAt && (
                        <p className="mt-0.5 text-[9px] opacity-60 font-mono">{formatWhen(c.updatedAt)}</p>
                      )}
                    </button>
                    {onDeleteConversation && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(c.sessionId);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Collapsed Veris icons */}
      {isVeris && isCollapsed && (
        <div className="flex flex-col items-center gap-2 p-2 border-t border-app-border/45">
          {onNewChat && (
            <button
              type="button"
              onClick={onNewChat}
              title="New chat"
              className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-app-muted hover:bg-app-accent-muted hover:text-app-accent transition-colors"
            >
              <Plus className="h-[18px] w-[18px]" />
              <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-app-border bg-app-surface px-2.5 py-1 text-xs font-medium text-app-text shadow-app-lg opacity-0 group-hover:opacity-100 transition-opacity">
                New chat
              </span>
            </button>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            title="History"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl text-app-muted hover:bg-app-accent-muted hover:text-app-accent transition-colors"
          >
            <History className="h-[18px] w-[18px]" />
            <span className="pointer-events-none absolute left-full ml-2 z-50 whitespace-nowrap rounded-lg border border-app-border bg-app-surface px-2.5 py-1 text-xs font-medium text-app-text shadow-app-lg opacity-0 group-hover:opacity-100 transition-opacity">
              History
            </span>
          </button>
        </div>
      )}

    </aside>
  );
}

export function AppTopBar() {
  const { user, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-app-border bg-app-bg/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2.5 lg:hidden">
          <span className="font-bold tracking-tight text-app-text">Arivo</span>
        </div>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Profile Dropdown Container */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-2.5 rounded-xl border border-app-border bg-app-card p-1.5 sm:px-3 sm:py-2 text-left transition-all hover:border-app-border-strong hover:bg-app-card/65 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-app-accent-muted text-sm font-bold text-app-accent">
              {user?.name ? user.name.charAt(0) : "AG"}
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none text-app-text">{user?.name ?? "Akhilesh Goswami"}</p>
              <p className="mt-1 text-xs text-app-muted">{user?.email ?? "agiri5375@gmail.com"}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-app-muted shrink-0" />
          </button>

          {profileMenuOpen && (
            <>
              {/* Click-away overlay */}
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setProfileMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 z-50 w-48 rounded-xl border border-app-border bg-app-surface p-1.5 shadow-app-lg animate-fade-in">
                <Link
                  href="/"
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-app-muted transition-all duration-150 hover:bg-app-card hover:text-app-text"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Exit to Website
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-app-muted transition-all duration-150 hover:bg-app-danger/10 hover:text-app-danger"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function AppMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-app-border bg-app-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Mobile app navigation"
    >
      <div className="flex">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors duration-200",
                active ? "text-app-accent" : "text-app-muted"
              )}
            >
              {active && (
                <span className="absolute top-0 h-0.5 w-10 rounded-full bg-app-accent" />
              )}
              <Icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


"use client";

import { useState } from "react";
import Link from "next/link";
import { AppCard } from "@/components/app/AppCard";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { useAuth } from "@/features/auth/context/auth-context";
import { useTheme } from "@/features/theme/theme-context";
import { ChevronRight, LogOut, Sun, Moon, Check, ShieldAlert, Link as LinkIcon, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const activeUser = {
    name: user?.name ?? "Akhilesh Goswami",
    email: user?.email ?? "agiri5375@gmail.com",
    initials: (user?.name ? user.name.split(" ").map(n => n[0]).join("") : "AG").toUpperCase()
  };

  const [feedbackCategory, setFeedbackCategory] = useState("general");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackStatus("submitting");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "8720f665-cae0-4d29-bcc3-24f50ef18586";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Arivo Feedback] - ${feedbackCategory.toUpperCase()}`,
          from_name: "Arivo App",
          name: activeUser.name,
          email: activeUser.email,
          message: feedbackMessage,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submit failed");
      setFeedbackMessage("");
      setFeedbackStatus("success");
    } catch {
      setFeedbackStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-12">
      <style>{`
        .dark {
          --app-bg: #16181d;
          --app-surface: #1c1f26;
          --app-card: #21242d;
          --app-border: #2a2e3a;
          --app-accent: #00c896;
          --app-text: #e2e4ea;
          --app-muted: #808796;
          --app-card-hover: #262a35;
        }
      `}</style>

      <AppPageHeader title="Settings" description="Manage your account and preferences" />

      {/* Profile Section */}
      <AppCard>
        <h2 className="mb-4 text-sm font-bold text-app-text tracking-wide uppercase">Profile</h2>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-app-accent/10 border border-app-accent/20 text-lg font-bold text-app-accent">
            {activeUser.initials}
          </span>
          <div>
            <p className="font-semibold text-app-text text-sm sm:text-base">{activeUser.name}</p>
            <p className="text-xs sm:text-sm text-app-muted">{activeUser.email}</p>
          </div>
        </div>
      </AppCard>

      {/* Appearance Section */}
      <AppCard>
        <h2 className="mb-4 text-sm font-bold text-app-text tracking-wide uppercase">Appearance</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            { id: "light" as const, label: "Light mode", icon: Sun, desc: "Clean white interface" },
            { id: "dark" as const, label: "Dark mode", icon: Moon, desc: "Easy on the eyes" },
          ]).map((option) => {
            const Icon = option.icon;
            const active = theme === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setTheme(option.id)}
                className={`rounded-[12px] border p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-app-accent bg-app-accent/5 shadow-sm"
                    : "border-app-border bg-app-surface hover:border-app-muted/30"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg bg-app-card ${active ? "text-app-accent" : "text-app-muted"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {active && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-app-accent text-app-bg">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="font-semibold text-app-text text-sm">{option.label}</p>
                <p className="mt-1 text-xs text-app-muted">{option.desc}</p>
              </button>
            );
          })}
        </div>
      </AppCard>

      {/* Preferences Rows */}
      <AppCard className="overflow-hidden p-0">
        {[
          { label: "Notifications", value: "Enabled" },
          { label: "Privacy", value: "Standard" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center justify-between border-b border-app-border px-5 py-4 text-left transition-colors duration-200 last:border-0 hover:bg-app-card-hover"
          >
            <span className="text-app-text text-sm">{item.label}</span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-app-muted">
              {item.value}
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </AppCard>

      {/* Connected Accounts Section */}
      <AppCard>
        <h2 className="mb-4 text-sm font-bold text-app-text tracking-wide uppercase">Connected accounts</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-[12px] border border-app-border bg-app-surface p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-app-card text-app-accent">
                <LinkIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-app-text">Primary bank account</p>
                <p className="text-xs text-app-muted">HDFC Bank •••• 9876</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-app-success border border-emerald-500/20">
              Connected
            </span>
          </div>
        </div>
      </AppCard>

      {/* Feedback Section */}
      <AppCard>
        <h2 className="mb-4 text-sm font-bold text-app-text tracking-wide uppercase">Share Feedback</h2>
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          <div>
            <label htmlFor="feedbackCategory" className="mb-1.5 block text-xs font-semibold text-app-muted uppercase tracking-wider">
              Category
            </label>
            <select
              id="feedbackCategory"
              value={feedbackCategory}
              onChange={(e) => setFeedbackCategory(e.target.value)}
              className="w-full rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm text-app-text outline-none focus:border-app-accent transition-all"
            >
              <option value="general">General Feedback</option>
              <option value="bug">Report a Bug</option>
              <option value="feature">Feature Request</option>
            </select>
          </div>

          <div>
            <label htmlFor="feedbackMessage" className="mb-1.5 block text-xs font-semibold text-app-muted uppercase tracking-wider">
              Feedback details
            </label>
            <textarea
              id="feedbackMessage"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Tell us what you think or report a bug..."
              rows={4}
              required
              className="w-full rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm text-app-text placeholder-app-muted outline-none focus:border-app-accent resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={feedbackStatus === "submitting" || !feedbackMessage.trim()}
            className="rounded-xl bg-app-accent text-app-bg px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-app-accent/90 disabled:opacity-50 transition-all cursor-pointer"
          >
            {feedbackStatus === "submitting" ? "Sending..." : "Submit Feedback"}
          </button>
        </form>

        {feedbackStatus === "success" && (
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs sm:text-sm">
            <strong className="block text-app-success">Feedback submitted.</strong>
            <span className="text-app-muted">Thank you for helping us improve Arivo!</span>
          </div>
        )}

        {feedbackStatus === "error" && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs sm:text-sm">
            <strong className="block text-app-danger">Something went wrong.</strong>
            <span className="text-app-muted">Please try again or email us directly at hello@arivoai.in.</span>
          </div>
        )}
      </AppCard>

      {/* Danger Zone Section */}
      <AppCard className="border border-red-500/20 bg-red-500/[0.02]">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="h-4 w-4 text-app-danger" />
          <h2 className="text-sm font-bold text-app-danger tracking-wide uppercase">Danger zone</h2>
        </div>
        <p className="text-xs text-app-muted mb-4 leading-relaxed">
          Permanently delete your Arivo account and erase all associated bank links, vaults, and goals data. This action is irreversible.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/delete-account/"
            className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-bold text-app-danger hover:bg-red-500/20 transition-all border border-red-500/20"
          >
            Delete account
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg bg-app-surface px-4 py-2 text-xs font-bold text-app-muted hover:text-app-text border border-app-border transition-all"
          >
            <LogOut className="h-3 w-3" />
            Logout
          </button>
        </div>
      </AppCard>

      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#475569] flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
      </div>
    </div>
  );
}

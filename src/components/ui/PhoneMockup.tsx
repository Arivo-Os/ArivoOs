"use client";

import { cn } from "@/lib/utils";

export type PhoneScreen = "dashboard" | "chat" | "goals";

interface PhoneMockupProps {
  screen?: PhoneScreen;
  className?: string;
  assistantName?: string;
}

export function PhoneMockup({
  screen = "dashboard",
  className,
  assistantName = "Arivo",
}: PhoneMockupProps) {
  return (
    <div
      role="img"
      aria-label="Interactive Arivo mobile app simulator mockup showing account balances, advisory companion prompts, and goal progress bars"
      className={cn(
        "relative mx-auto w-[280px] overflow-hidden rounded-[2.5rem] border-[3px] border-white/10 bg-[#0B1520] shadow-[0_32px_80px_rgba(0,0,0,0.45)] sm:w-[300px]",
        className
      )}
    >
      <div className="absolute left-1/2 top-3 z-10 h-5 w-[72px] -translate-x-1/2 rounded-full bg-black/60" aria-hidden="true" />
      <div className="px-4 pb-5 pt-10 text-white">
        {screen === "dashboard" && <DashboardScreen assistantName={assistantName} />}
        {screen === "chat" && <ChatScreen assistantName={assistantName} />}
        {screen === "goals" && <GoalsScreen />}
      </div>
    </div>
  );
}

function DashboardScreen({ assistantName }: { assistantName: string }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-white/90">Good morning</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">AG</span>
      </div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/45">Total balance</p>
      <p className="mb-5 font-display text-[2rem] font-extrabold leading-none tracking-tight">₹2,96,650</p>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-[10px] text-white/45">Income</p>
          <p className="text-sm font-bold text-accent-primary">₹75,000</p>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-[10px] text-white/45">Expenses</p>
          <p className="text-sm font-bold text-white/90">₹25,000</p>
        </div>
      </div>
      <div className="mb-4 rounded-xl border border-accent-primary/25 bg-accent-primary/10 p-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-accent-primary">Ask {assistantName}</p>
        <p className="text-xs leading-relaxed text-white/75">Can I afford a Europe trip this year?</p>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-semibold text-white/55">Goals</p>
        <div className="space-y-2">
          {[
            { name: "Europe Trip", pct: 38 },
            { name: "Emergency Fund", pct: 72 },
          ].map((g) => (
            <div key={g.name} className="rounded-lg bg-white/5 p-2.5">
              <div className="mb-1.5 flex justify-between text-[10px]">
                <span className="text-white/75">{g.name}</span>
                <span className="font-semibold text-accent-primary">{g.pct}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-accent-primary" style={{ width: `${g.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ChatScreen({ assistantName }: { assistantName: string }) {
  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent-primary/20 text-[10px] font-bold text-accent-primary">
          {assistantName.charAt(0)}
        </span>
        <span className="text-sm font-semibold">Ask {assistantName}</span>
      </div>
      <div className="mb-3 flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent-primary px-3 py-2 text-[11px] font-medium text-[#08111A]">
          Should I buy a car worth ₹8L right now?
        </div>
      </div>
      <div className="mb-4 rounded-2xl rounded-bl-sm bg-white/8 p-3">
        <p className="mb-2 text-[11px] leading-relaxed text-white/80">
          Based on your savings and EMI capacity, I&apos;d recommend waiting 3 months to strengthen your emergency fund first.
        </p>
        <p className="text-[10px] font-semibold text-accent-primary">Medium risk · 74% confidence</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="mb-2 text-[10px] text-white/45">Suggested questions</p>
        <div className="flex flex-wrap gap-1.5">
          {["Afford Bali trip?", "Invest ₹50K?", "Move cities?"].map((q) => (
            <span key={q} className="rounded-full border border-white/10 px-2 py-1 text-[9px] text-white/65">{q}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function GoalsScreen() {
  return (
    <>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-white/45">Your goals</p>
      <p className="mb-5 text-lg font-bold">Every goal has a plan</p>
      {[
        { name: "Europe Trip", target: "₹2,50,000", saved: "₹95,000", pct: 38, eta: "Aug 2026" },
        { name: "Emergency Fund", target: "₹3,00,000", saved: "₹2,16,000", pct: 72, eta: "Mar 2026" },
        { name: "New Laptop", target: "₹1,20,000", saved: "₹48,000", pct: 40, eta: "Jun 2026" },
      ].map((g) => (
        <div key={g.name} className="mb-3 rounded-xl bg-white/5 p-3">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold">{g.name}</p>
              <p className="text-[10px] text-white/45">Target {g.target}</p>
            </div>
            <span className="rounded-full bg-accent-primary/15 px-2 py-0.5 text-[9px] font-semibold text-accent-primary">{g.pct}%</span>
          </div>
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-accent-primary to-brand-teal" style={{ width: `${g.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-white/45">
            <span>Saved {g.saved}</span>
            <span>ETA {g.eta}</span>
          </div>
        </div>
      ))}
    </>
  );
}

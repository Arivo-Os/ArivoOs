"use client";

import React, { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body, Caption } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { 
  TrendingUp, 
  PieChart, 
  Wallet, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  ShieldCheck, 
  Zap, 
  Info,
  DollarSign,
  TrendingDown,
  Percent,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "net-worth" | "spending" | "investments" | "advisory";

interface TabItem {
  id: TabId;
  label: string;
  description: string;
  icon: React.ElementType;
}

const tabs: TabItem[] = [
  {
    id: "net-worth",
    label: "Net Worth Tracker",
    description: "Aggregate all assets and liabilities automatically in one single view.",
    icon: Wallet,
  },
  {
    id: "spending",
    label: "Intelligent Spending",
    description: "Auto-categorize transactions and track real-time burn rates across bank accounts.",
    icon: PieChart,
  },
  {
    id: "investments",
    label: "Investment Hub",
    description: "Monitor mutual funds, stocks, and deposits in a single dashboard with live pricing.",
    icon: TrendingUp,
  },
  {
    id: "advisory",
    label: "Smart Recommendations",
    description: "Get personalized AI recommendations to save tax, optimize interest, and reduce fees.",
    icon: Sparkles,
  },
];

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("net-worth");

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    }, 4500); // Auto change tab every 4.5 seconds for active dashboard previews

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Render content depending on active tab
  // Render content depending on active tab
  const renderMockup = () => {
    return (
      <div className="w-full bg-[#08111A] text-white rounded-3xl border border-white/5 p-4 sm:p-6 font-sans shadow-2xl relative overflow-hidden animate-fade-in text-left">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 pb-5 border-b border-white/5 mb-5">
          <div className={cn(
            "transition-all duration-300 rounded-xl p-2 -m-2",
            activeTab === "net-worth" && "bg-white/5 border border-white/10"
          )}>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">TOTAL VALUATION</span>
            <h3 className="text-2xl font-black text-white mt-0.5 tracking-tight">₹2,000</h3>
          </div>
          <span className={cn(
            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-300",
            activeTab === "advisory"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 scale-105"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          )}>
            <Sparkles className="w-3 h-3" /> Diagnostics Active
          </span>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {/* Card 1 */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">MONTHLY INCOME</span>
            <span className="text-base font-bold text-white mt-1 block">₹75,000</span>
          </div>
          {/* Card 2 */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">SAVINGS RATE</span>
            <span className="text-base font-bold text-[#22c55e] mt-1 block">67%</span>
          </div>
          {/* Card 3 */}
          <div className={cn(
            "border p-4 rounded-xl flex flex-col justify-between transition-all duration-300",
            activeTab === "spending"
              ? "bg-white/10 border-white/20 scale-[1.02]"
              : "bg-white/5 border-white/5"
          )}>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">MONTHLY EXPENSES</span>
            <span className="text-base font-bold text-slate-300 mt-1 block">₹25,000</span>
          </div>
        </div>

        {/* Graph Card */}
        <div className={cn(
          "border p-4 rounded-xl flex flex-col justify-between h-40 mb-5 transition-all duration-300",
          activeTab === "investments"
            ? "bg-white/10 border-white/20 scale-[1.01]"
            : "bg-white/5 border-white/5"
        )}>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">ASSETS GROWTH DIAGNOSTICS</span>
          <div className="h-24 flex items-end justify-between px-1 pt-3 relative">
            <div className="absolute inset-0 flex flex-col justify-between opacity-[0.02] pointer-events-none">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>
            <svg className="absolute inset-0 w-full h-full p-1 overflow-visible" preserveAspectRatio="none">
              <path d="M 0 65 Q 120 55 240 45 T 480 30 T 720 15 L 720 100 L 0 100 Z" fill="rgba(34, 197, 94, 0.03)" />
              <path d="M 0 65 Q 120 55 240 45 T 480 30 T 720 15" fill="none" stroke="#22c55e" strokeWidth="2" />
              <circle cx="480" cy="30" r="3" fill="#22c55e" />
              <circle cx="720" cy="15" r="3" fill="#22c55e" />
            </svg>
            <div className="text-[8px] text-slate-500 font-medium z-10">M1</div>
            <div className="text-[8px] text-slate-500 font-medium z-10">M2</div>
            <div className="text-[8px] text-slate-500 font-medium z-10">M3</div>
            <div className="text-[8px] text-slate-500 font-medium z-10">M4</div>
            <div className="text-[8px] text-slate-500 font-medium z-10">M5</div>
          </div>
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Goals */}
          <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">GOALS</h4>
              <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-0.5">
                <Plus className="w-2.5 h-2.5" /> Add Goal
              </span>
            </div>
            <div className="rounded-lg bg-white/5 p-3 border border-white/5">
              <div className="mb-1 flex justify-between text-[10px] font-semibold">
                <span className="text-slate-300">Europe Trip</span>
                <span className="text-[#22c55e]">38%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#22c55e]" style={{ width: "38%" }} />
              </div>
            </div>
          </div>

          {/* Ask Veris */}
          <div className={cn(
            "border p-4 rounded-xl flex flex-col justify-between transition-all duration-300",
            activeTab === "advisory"
              ? "bg-white/10 border-white/20 scale-[1.02]"
              : "bg-white/5 border-white/5"
          )}>
            <div className="flex items-center gap-1 mb-2">
              <div className="p-1 bg-emerald-500/10 text-emerald-400 rounded-md">
                <MessageSquare className="w-3 h-3" />
              </div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">ASK VERIS</h4>
            </div>
            <p className="text-[9px] text-slate-400 mb-3 leading-tight">
              Get an instant simulated decision recommendation before your next large expenditure.
            </p>
            <div className="flex gap-1.5">
              <input
                type="text"
                disabled
                placeholder="Can I afford a Europe trip this year?"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                disabled
                className="bg-[#22c55e] text-[#08111A] font-bold px-2.5 py-1.5 rounded-lg text-[10px] shrink-0 flex items-center gap-0.5"
              >
                Ask <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-[8px] text-slate-500 flex items-center gap-1 pt-3 border-t border-white/5 mt-4">
          <Info className="w-2.5 h-2.5 shrink-0" />
          All recommendations are educational decision support insights based on self-reported inputs. We are not a SEBI-registered entity.
        </div>
      </div>
    );
  };

  return (
    <Section variant="gradient" id="product-preview" className="relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="section-label">Product Vision</span>
        <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
          A unified workspace, in design.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          Tired of scattered spreadsheets? Explore our interactive vision preview illustrating the automatic integrations, bank syncs, and smart alerts our engineering team is actively building.
        </Body>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Tab Controls (Left side on desktop, top on mobile) */}
        <div 
          role="tablist"
          aria-label="Product feature previews"
          className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x lg:snap-none"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 snap-center w-64 lg:w-full text-left p-4 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green dark:focus-visible:ring-brand-green focus-visible:ring-offset-2",
                  isActive
                    ? "bg-white dark:bg-slate-900 border-brand-green shadow-md dark:shadow-slate-950/40 text-brand-green"
                    : "bg-transparent border-transparent hover:bg-slate-200/50 dark:hover:bg-slate-900/40 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive ? "bg-brand-green/10 text-brand-green" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  )}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block text-sm">
                      {tab.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {tab.description}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tab Preview Viewport (Right side) */}
        <div 
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="w-full lg:w-2/3 min-h-[420px] flex items-center justify-center focus-visible:outline-none"
        >
          {renderMockup()}
        </div>
      </div>
    </Section>
  );
};

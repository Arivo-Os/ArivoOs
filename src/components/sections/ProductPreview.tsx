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
  Percent
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
  const renderMockup = () => {
    switch (activeTab) {
      case "net-worth":
        return (
          <div className="w-full bg-[#0a111e] text-slate-100 rounded-2xl border border-slate-800 p-6 font-sans shadow-2xl relative overflow-hidden animate-fade-in">
            {/* Glowing gradient backdrops */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-85 h-85 bg-[#14b8a6]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <Caption className="text-slate-400 block uppercase tracking-wider text-xs font-semibold">Total Wealth</Caption>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold tracking-tight text-white">₹24,82,450</span>
                  <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% this month
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="bg-slate-800 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700">
                  Monthly View
                </span>
              </div>
            </div>

            {/* Asset vs Liabilities Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <Caption className="text-slate-400 text-xs font-semibold">ASSETS</Caption>
                  <span className="text-emerald-400 text-sm font-semibold">₹27,32,450</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Investments</span>
                    <span className="text-white font-medium">₹18,50,000</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "67%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-300">Bank Accounts</span>
                    <span className="text-white font-medium">₹6,82,450</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#14b8a6] h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-300">EPF & Others</span>
                    <span className="text-white font-medium">₹2,00,000</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "8%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <Caption className="text-slate-400 text-xs font-semibold">LIABILITIES</Caption>
                  <span className="text-rose-400 text-sm font-semibold">₹2,50,000</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">HDFC Credit Card</span>
                    <span className="text-white font-medium">₹65,000</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: "26%" }} />
                  </div>
                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-300">Car Loan</span>
                    <span className="text-white font-medium">₹1,85,000</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "74%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated interactive line chart */}
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Net Worth Growth</span>
                <span className="text-slate-400 text-xs">Past 6 months</span>
              </div>
              <div className="h-32 flex items-end justify-between px-2 pt-4 relative">
                {/* SVG Line representation */}
                <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Fill Area */}
                  <path
                    d="M 0 90 Q 75 75 150 60 T 300 45 T 450 30 T 600 15 L 600 120 L 0 120 Z"
                    fill="url(#chart-glow)"
                    className="w-full"
                  />
                  {/* Line */}
                  <path
                    d="M 0 90 Q 75 75 150 60 T 300 45 T 450 30 T 600 15"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    className="w-full"
                  />
                  {/* Highlight dots */}
                  <circle cx="300" cy="45" r="5" fill="#10b981" stroke="#0a111e" strokeWidth="2" />
                  <circle cx="600" cy="15" r="5" fill="#10b981" stroke="#0a111e" strokeWidth="2" />
                </svg>

                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                  <div className="border-b border-white w-full" />
                </div>

                <div className="text-slate-500 text-[10px] z-10">Jan</div>
                <div className="text-slate-500 text-[10px] z-10">Feb</div>
                <div className="text-slate-500 text-[10px] z-10">Mar</div>
                <div className="text-slate-500 text-[10px] z-10">Apr</div>
                <div className="text-slate-500 text-[10px] z-10">May</div>
                <div className="text-slate-500 text-[10px] z-10">Jun</div>
              </div>
            </div>
          </div>
        );

      case "spending":
        return (
          <div className="w-full bg-[#0a111e] text-slate-100 rounded-2xl border border-slate-800 p-6 font-sans shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-85 h-85 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <Caption className="text-slate-400 block uppercase tracking-wider text-xs font-semibold">Spending Insight</Caption>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold tracking-tight text-white">₹42,850</span>
                  <span className="text-slate-400 text-xs">spent this month</span>
                </div>
              </div>
              <span className="bg-rose-500/15 text-rose-400 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-rose-500/20">
                <TrendingUp className="w-3 h-3" /> 8% below forecast
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Category Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Top Categories</span>
                
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                    <span className="text-xs text-slate-200">Rent & Bills</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">₹18,000</span>
                    <span className="text-[10px] text-slate-400">42% of total</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full" />
                    <span className="text-xs text-slate-200">Food & Dining</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">₹9,450</span>
                    <span className="text-[10px] text-slate-400">22% of total</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#14b8a6] rounded-full" />
                    <span className="text-xs text-slate-200">Travel & Fuel</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">₹6,200</span>
                    <span className="text-[10px] text-slate-400">14% of total</span>
                  </div>
                </div>
              </div>

              {/* Live Feeds of Autocategorization */}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Linked Accounts Live Feed</span>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-[#14b8a6]">
                        Z
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Zomato</span>
                        <span className="text-[9px] text-slate-400">Swiped Credit Card • Food & Dining</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">-₹640</span>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-blue-500">
                        U
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Uber India</span>
                        <span className="text-[9px] text-slate-400">UPI Auto-pay • Transport</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">-₹340</span>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-500">
                        A
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block">Amazon Pay</span>
                        <span className="text-[9px] text-slate-400">ICICI Bank Account • Shopping</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">-₹2,150</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "investments":
        return (
          <div className="w-full bg-[#0a111e] text-slate-100 rounded-2xl border border-slate-800 p-6 font-sans shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-85 h-85 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <Caption className="text-slate-400 block uppercase tracking-wider text-xs font-semibold">Investments Valuation</Caption>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold tracking-tight text-white">₹18,50,000</span>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% (All-time gain)
                  </span>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-1 rounded-lg flex gap-1 text-[11px] font-medium text-slate-400">
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded">Current Value</span>
                <span className="px-2 py-0.5">XIRR: 14.8%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">MUTUAL FUNDS</span>
                <span className="text-lg font-bold text-white block mt-1">₹12,45,000</span>
                <span className="text-emerald-400 text-[10px] flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +16.2%
                </span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">DIRECT STOCKS</span>
                <span className="text-lg font-bold text-white block mt-1">₹4,20,000</span>
                <span className="text-emerald-400 text-[10px] flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> +28.5%
                </span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">FIXED DEPOSITS</span>
                <span className="text-lg font-bold text-white block mt-1">₹1,85,000</span>
                <span className="text-slate-400 text-[10px] block mt-1">
                  Avg Yield: 7.1%
                </span>
              </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 relative z-10">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">Linked Portfolios Status</span>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <div>
                    <span className="text-xs text-white font-semibold block">Zerodha Coin (Mutual Funds)</span>
                    <span className="text-[10px] text-slate-400">Synced 4 mins ago • Auto-Fetch ON</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <div>
                    <span className="text-xs text-white font-semibold block">Groww (Stocks Portfolio)</span>
                    <span className="text-[10px] text-slate-400">Synced 12 mins ago • Live tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "advisory":
        return (
          <div className="w-full bg-[#0a111e] text-slate-100 rounded-2xl border border-slate-800 p-6 font-sans shadow-2xl relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-85 h-85 bg-teal-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative z-10">
              <div>
                <Caption className="text-slate-400 block uppercase tracking-wider text-xs font-semibold">AI Assistant Insights</Caption>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold tracking-tight text-white">Intelligent Optimization</span>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-medium border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 3 Recommendations Active
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Rec 1 */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-emerald-500/30 transition-all duration-200">
                <div className="flex justify-between items-start gap-3">
                  <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Optimize High-Cost Liabilities</span>
                      <span className="text-emerald-400 text-xs font-bold font-mono">Save ~₹14,500/yr</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      You carry a rollover balance of ₹35,000 on your Credit Card charging 42% APR. Arivo can help you refinance this with a low-cost personal credit line at 13.5% APR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rec 2 */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-amber-500/30 transition-all duration-200">
                <div className="flex justify-between items-start gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Unutilized Emergency Cash Alert</span>
                      <span className="text-amber-400 text-xs font-bold font-mono">Earn +₹6,800/yr</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      You have ₹2,40,000 sitting in your low-interest (2.7%) savings account for over 90 days. Move it to a sweep-in FD or low-duration liquid fund yielding 6.8%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rec 3 */}
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-200">
                <div className="flex justify-between items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Underperforming ELSS Fund Swap</span>
                      <span className="text-blue-400 text-xs font-bold font-mono">Improve CAGR by 3.2%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Your current ELSS tax saver fund has underperformed its benchmark by 4.1% over 3 years. Consider swapping future SIP allocations to a top-tier peer fund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x lg:snap-none">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 snap-center w-64 lg:w-full text-left p-4 rounded-xl border transition-all duration-200 outline-none",
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
        <div className="w-full lg:w-2/3 min-h-[420px] flex items-center justify-center">
          {renderMockup()}
        </div>
      </div>
    </Section>
  );
};

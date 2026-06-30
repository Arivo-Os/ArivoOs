import React from 'react';
import { H1, Body } from '@/components/ui/Typography';
import Link from 'next/link';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { ArrowRight, Smartphone, Compass, ShieldCheck } from 'lucide-react';
import { GOOGLE_PLAY_URL } from '@/lib/constants/site';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32 bg-[#08111A] text-white">
      {/* Dynamic ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-[10%] w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
        {/* Release Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-semibold mb-6">
          <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
          Closed Beta now on Google Play
        </div>

        {/* Value Prop Headline */}
        <H1 className="text-white mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto font-extrabold text-balance">
          Know exactly where you stand financially—every day.
        </H1>

        {/* Clear Outcome Description */}
        <Body className="text-slate-300 mb-10 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Arivo maps your income, expenses, and assets in a secure private profile, giving you personalized diagnostics and clear decision support.
        </Body>

        <div className="flex justify-center mb-16">
          <Link
            href="/login/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-[#08111A] font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Try Arivo Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Visual Dashboard Mockups (Visually Dominate the Hero) */}
        <div className="relative mx-auto max-w-4xl mt-6">
          {/* Simulated Web App Browser Mockup */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-md overflow-hidden aspect-[16/9] w-full p-4 text-left font-sans flex flex-col pointer-events-none" role="img" aria-label="Desktop application interface mockup of the Arivo Dashboard showing net worth statistics and diagnostic status.">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-white/5 text-[10px] text-slate-400 py-1 px-8 rounded-md border border-white/5 font-mono">
                arivo.in/dashboard
              </div>
              <div className="w-12" />
            </div>

            {/* Dashboard Workspace */}
            <div className="flex flex-1 gap-4 overflow-hidden">
              {/* Sidebar navigation */}
              <div className="w-1/5 border-r border-white/5 pr-4 flex flex-col justify-between py-2 text-[11px] text-slate-400">
                <div className="space-y-3">
                  <div className="bg-brand-green/10 text-brand-green font-bold px-2 py-1 rounded-md">Dashboard</div>
                  <div className="px-2">Vault Profile</div>
                  <div className="px-2">Journey Plan</div>
                  <div className="px-2">Settings</div>
                </div>
                <div className="border-t border-white/5 pt-2 flex items-center gap-2 text-[10px]">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">AG</div>
                  <span>Akhilesh</span>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 space-y-4 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Total Valuation</span>
                    <span className="text-2xl font-bold text-white block mt-0.5">₹2,96,650</span>
                  </div>
                  <span className="text-[10px] bg-brand-green/15 text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20">
                    Diagnostics Active
                  </span>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 block font-medium">MONTHLY INCOME</span>
                    <span className="text-sm font-bold text-white mt-1 block">₹75,000</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 block font-medium">SAVINGS RATE</span>
                    <span className="text-sm font-bold text-brand-green mt-1 block">67%</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                    <span className="text-[9px] text-slate-400 block font-medium">TOTAL LIABILITIES</span>
                    <span className="text-sm font-bold text-slate-300 mt-1 block">₹25,000</span>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex-1 h-28 flex flex-col justify-between">
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold block">Assets Growth Diagnostics</span>
                  <div className="h-16 flex items-end justify-between px-2 pt-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
                      <div className="border-b border-white w-full" />
                      <div className="border-b border-white w-full" />
                    </div>
                    {/* Simulated vector line graph */}
                    <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
                      <path d="M 0 50 Q 80 40 160 35 T 320 20 T 480 10 L 480 60 L 0 60 Z" fill="rgba(34, 197, 94, 0.04)" />
                      <path d="M 0 50 Q 80 40 160 35 T 320 20 T 480 10" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                      <circle cx="320" cy="20" r="3.5" fill="#22c55e" />
                    </svg>
                    <div className="text-[8px] text-slate-500 z-10">M1</div>
                    <div className="text-[8px] text-slate-500 z-10">M2</div>
                    <div className="text-[8px] text-slate-500 z-10">M3</div>
                    <div className="text-[8px] text-slate-500 z-10">M4</div>
                    <div className="text-[8px] text-slate-500 z-10">M5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Mobile App Mockup (Shows Cross-Platform Symmetry) */}
          <div className="absolute bottom-[-10%] right-[5%] z-20 scale-75 md:scale-95 hidden sm:block">
            <PhoneMockup screen="dashboard" assistantName="Veris" />
          </div>
        </div>
      </div>
    </section>
  );
};

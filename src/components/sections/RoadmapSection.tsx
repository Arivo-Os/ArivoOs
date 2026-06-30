import React from "react";
import { H2, H3, Body } from "@/components/ui/Typography";
import { 
  Building2, 
  TrendingUp, 
  Sparkles, 
  LineChart, 
  Users 
} from "lucide-react";

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-marketing-bg via-marketing-surface to-marketing-bg text-marketing-text">
      <div className="mx-auto px-6 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-label font-bold text-brand-green">Our Roadmap</span>
          <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
            We&apos;re building Arivo step by step.
          </H2>
          <Body className="text-slate-600 dark:text-slate-300">
            We&apos;re focusing on creating a trusted and intelligent personal finance platform. Here&apos;s what we&apos;re working toward.
          </Body>
        </div>

        {/* Two-Column Grid: Coming Next vs. Future Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Column 1: Coming Next */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2.5 h-2.5 bg-brand-green rounded-full" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Coming Next
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              These are the capabilities we plan to build as Arivo evolves.
            </p>

            {/* AA Integration */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200">
              <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green w-fit mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <H3 className="text-slate-900 dark:text-white text-base font-bold mb-2">
                Account Aggregator Integration
              </H3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect supported accounts securely through India&apos;s RBI-regulated Account Aggregator ecosystem to view balances in one place without sharing credentials.
              </p>
            </div>

            {/* Portfolio Tracking */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200">
              <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green w-fit mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <H3 className="text-slate-900 dark:text-white text-base font-bold mb-2">
                Investment Portfolio Tracking
              </H3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connect holdings from supported brokerage platforms to monitor portfolio returns and long-term asset value in one workspace.
              </p>
            </div>
          </div>

          {/* Column 2: Future Vision */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2.5 h-2.5 bg-teal-500 rounded-full" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Future Vision
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              These ideas represent our long-term vision and will be pursued as Arivo grows.
            </p>

            {/* Proactive Insights */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 w-fit mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <H3 className="text-slate-900 dark:text-white text-base font-bold mb-2">
                Proactive Financial Insights
              </H3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Receive metrics identifying high-interest liabilities, optimization targets, or under-utilized cash buffers.
              </p>
            </div>

            {/* Goal-Based Planning */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 w-fit mb-4">
                <LineChart className="w-5 h-5" />
              </div>
              <H3 className="text-slate-900 dark:text-white text-base font-bold mb-2">
                Goal-Based Financial Planning
              </H3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Set savings targets and view customized forecasts showing how allocation adjustments affect timeline outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Building in Public Summary Card */}
        <div className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-center max-w-4xl mx-auto mt-12">
          <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Building in Public
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Arivo is currently an early-stage product, and we&apos;re continuously improving it based on user feedback. Some capabilities shown on this page are part of our long-term roadmap and are not yet available. Our focus is simple: build thoughtfully, ship consistently, and earn your trust with every release.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

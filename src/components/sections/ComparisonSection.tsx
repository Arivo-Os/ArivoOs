import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { X, Check } from "lucide-react";

export const ComparisonSection: React.FC = () => {
  const painPoints = [
    "Juggling 5 different banking and investment apps to see balances.",
    "Hours spent updating manual spreadsheets that are immediately outdated.",
    "Hidden fees, rollover interest charges, and forgotten subscriptions.",
    "Vague charts and notifications without actionable next steps.",
    "Concerns about data privacy and bank login credential exposure.",
  ];

  const valueProps = [
    "One integrated, secure workspace showing all assets and liabilities.",
    "100% automated background synchronization with zero manual effort.",
    "Real-time notifications on optimization, bills, and high interest cards.",
    "Clear, helpful advice that shows you exactly how to save more money.",
    "Bank-grade safety, privacy-first, and Account Aggregator consent.",
  ];

  return (
    <Section variant="gradient" id="comparison">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="section-label font-bold text-rose-500 dark:text-rose-400">Before & After</span>
        <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
          Stop managing money on spreadsheets.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          See how Arivo takes you from cluttered chaos to having your money perfectly organized.
        </Body>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Pain points card */}
        <Card className="bg-slate-50/50 dark:bg-slate-950/20 border-slate-200/60 dark:border-slate-800/40 p-8 rounded-2xl flex flex-col justify-between hover:border-rose-500/10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
                <X className="w-5 h-5" />
              </div>
              <H3 className="text-slate-800 dark:text-slate-200 text-xl font-bold">
                Traditional Finance Tracking
              </H3>
            </div>
            <ul className="space-y-4">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-rose-500 font-semibold flex-shrink-0">
                    <X className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500">
            A manual, fragmented, and stressful financial experience.
          </div>
        </Card>

        {/* Value props card */}
        <Card className="bg-surface border-accent-primary/30 dark:border-accent-primary/20 p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Subtle top decoration badge */}
          <div className="absolute top-0 right-0 bg-accent-primary text-[#08111A] text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
            Recommended
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-accent-primary/10 text-accent-primary flex items-center justify-center font-bold">
                <Check className="w-5 h-5" />
              </div>
              <H3 className="text-slate-900 dark:text-white text-xl font-bold">
                Unified with Arivo
              </H3>
            </div>
            <ul className="space-y-4">
              {valueProps.map((prop, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 text-accent-primary font-semibold flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-slate-800 dark:text-slate-300 font-medium leading-relaxed">
                    {prop}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-accent-primary/90 font-medium">
            Automated, secure, and easy to use.
          </div>
        </Card>
      </div>
    </Section>
  );
};

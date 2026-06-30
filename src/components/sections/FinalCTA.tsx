import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, Body } from "@/components/ui/Typography";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <Section variant="dark" id="cta" className="relative text-center overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-[#14b8a6]/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto py-8">
        <span className="section-label text-brand-green font-bold uppercase tracking-[0.15em] block mb-4">
          Start Managing Your Wealth
        </span>
        <H2 className="text-white text-3xl font-extrabold tracking-tight mb-4">
          Take control of your money today
        </H2>
        <Body className="text-slate-300 max-w-xl mx-auto mb-10 text-sm">
          Join builders and finance professionals. Get secure diagnostics and clear decision support.
        </Body>

        <div className="flex justify-center">
          <Link
            href="/login/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green text-[#08111A] font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Try Arivo Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 text-xs text-slate-400">
          Available on iOS, Android, and Desktop web browsers. Privacy guaranteed.
        </div>
      </div>
    </Section>
  );
};

import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { 
  Eye, 
  ShieldCheck, 
  BrainCircuit 
} from "lucide-react";

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
  tagline: string;
}

export const BenefitsSection: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      icon: Eye,
      title: "Private Financial Profile",
      tagline: "All key numbers in one spot",
      description: "Centralize your core assets, liabilities, and income parameters in a secure private vault to calculate your financial diagnostics instantly.",
    },
    {
      icon: BrainCircuit,
      title: "Always Know Where Your Money Goes",
      tagline: "Decision-support advisor",
      description: "Get diagnostic insights and analysis on how to optimize unutilized cash or evaluate large purchases based on your custom inputs.",
    },
    {
      icon: ShieldCheck,
      title: "Secure By Design",
      tagline: "Private storage",
      description: "Your data is stored locally and securely under AES-256 encryption. We never sell your data or serve ads.",
    },
  ];

  return (
    <Section variant="alt" id="benefits">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="section-label">Why Choose Arivo</span>
        <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
          The smart operating system for your financial life.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          Arivo is built to empower you with clarity, intelligence, and premium control. Every benefit is tailored to deliver maximum financial wellness with absolute data security.
        </Body>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index} className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-green/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-brand-green/10 text-emerald-700 dark:text-brand-green">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-brand-green uppercase tracking-wider block">
                    {benefit.tagline}
                  </span>
                  <H3 className="text-slate-900 dark:text-white text-lg font-bold mt-0.5">
                    {benefit.title}
                  </H3>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2 flex-grow">
                {benefit.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

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
      description: "Keep all your money details in one secure place so you can instantly see your Financial Health.",
    },
    {
      icon: BrainCircuit,
      title: "Always Know Where Your Money Goes",
      tagline: "Your helpful guide",
      description: "Get helpful suggestions on how to save more or check if you can afford large purchases based on your situation.",
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
          Your Money, Organized.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          Arivo helps you see your money clearly. We keep things simple, private, and secure so you can make the best choices for your future.
        </Body>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index} className="flex flex-col h-full bg-surface border border-slate-200/80 dark:border-slate-800/80 hover:border-accent-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-accent-primary/10 text-accent-primary dark:text-accent-primary">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-accent-primary dark:text-accent-primary uppercase tracking-wider block">
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

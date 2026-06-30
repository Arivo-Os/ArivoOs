import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body } from "@/components/ui/Typography";
import { 
  Link2, 
  LineChart, 
  Sparkles 
} from "lucide-react";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "01",
      icon: Link2,
      title: "Create Your Vault Profile",
      description: "Input your core income, assets, and liabilities into your private dashboard in under 2 minutes.",
    },
    {
      number: "02",
      icon: LineChart,
      title: "Review Financial Diagnostics",
      description: "View calculated asset allocations, debt ratios, and financial health scores instantly.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Receive Decision Support",
      description: "Ask Veris to simulate large purchase decisions or identify unutilized cash opportunities.",
    },
  ];

  return (
    <Section variant="alt" id="how-it-works" className="relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="section-label">Quick Setup</span>
        <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
          Ready in three simple steps.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          Set up your secure profile, analyze calculated metrics, and start simulating key financial choices.
        </Body>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
        {/* Connection line helper on desktop */}
        <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 -z-10" />

        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
              {/* Number and Icon Header */}
              <div className="flex justify-between items-center w-full mb-6">
                <div className="p-3 bg-brand-green/10 text-brand-green rounded-xl">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-4xl font-extrabold text-slate-200 dark:text-slate-800 font-mono">
                  {step.number}
                </span>
              </div>
              
              <H3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">
                {step.title}
              </H3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

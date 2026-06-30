import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { 
  ShieldCheck, 
  Lock, 
  Coins, 
  HeartHandshake 
} from "lucide-react";

interface TrustItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const TrustDetails: React.FC = () => {
  const trustDetails: TrustItem[] = [
    {
      icon: ShieldCheck,
      title: "Privacy First",
      description: "Your financial profile data is encrypted in transit and at rest with zero third-party ads.",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "We use AES-256 encryption standards to protect your private parameters.",
    },
    {
      icon: Coins,
      title: "Your Data Stays Yours",
      description: "Arivo does not sell user data or share financial intelligence with external networks.",
    },
    {
      icon: HeartHandshake,
      title: "Built for India",
      description: "Designed specifically to support Indian wealth, tax diagnostics, and financial goals.",
    },
  ];

  return (
    <Section variant="gradient" id="security">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Visual/Text Column */}
        <div className="w-full lg:w-1/2">
          <span className="section-label font-bold text-emerald-500">Security First</span>
          <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-6 text-balance text-3xl md:text-4xl">
            Your trust is our ultimate benchmark.
          </H2>
          <Body className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            We design security directly into our architecture, utilizing local parameters and encryption to protect your data while you explore financial decisions.
          </Body>
          
          <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#08111A] dark:text-emerald-300">
              Designed with reference to ISO 27001 data security best practices.
            </span>
          </div>
        </div>

        {/* Details Grid Column */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trustDetails.map((detail, index) => {
            const IconComponent = detail.icon;
            return (
              <Card key={index} className="bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800/40 p-5 rounded-2xl flex flex-col justify-between hover:border-brand-green/30">
                <div>
                  <div className="p-2 bg-brand-green/10 text-brand-green rounded-lg w-fit mb-4">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <H3 className="text-slate-900 dark:text-white text-base font-bold mb-2">
                    {detail.title}
                  </H3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

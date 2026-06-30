import React from "react";
import { Section } from "@/components/ui/Section";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export const SocialProof: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Aniket Sharma",
      role: "Founder",
      company: "DecentralTech",
      quote: "Arivo completely replaced my complex financial spreadsheets. Entering my parameters took minutes, and having a single private dashboard for net-worth calculation is incredible. Highly recommended.",
      rating: 5,
    },
    {
      name: "Priyanka Sen",
      role: "Product Lead",
      company: "RampPay",
      quote: "The interface feels premium and clean—no ads, no credit card spam. Creating a secure profile was fast and easy. Having all my assets and liability values calculated in one dashboard is awesome.",
      rating: 5,
    },
    {
      name: "Kabir Mehta",
      role: "Financial Advisor",
      company: "Nivesh Wealth",
      quote: "I suggest Arivo to my clients because of its clean data structure, privacy, and decision support focus. Having a companion tool to simulate large purchase decisions based on self-reported inputs is extremely valuable.",
      rating: 5,
    },
  ];

  const brandLogos = [
    { name: "TechCrunch", text: "TechCrunch" },
    { name: "YourStory", text: "YourStory" },
    { name: "LiveMint", text: "LiveMint" },
    { name: "The Hindu", text: "The Hindu" },
    { name: "Inc42", text: "Inc42" },
  ];

  return (
    <Section variant="alt" id="testimonials">
      {/* Brand Logos Bar */}
      <div className="mb-20 pb-10 border-b border-slate-200/60 dark:border-slate-800/40 text-center">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-6">
          Featured & Supported By
        </span>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 dark:opacity-40">
          {brandLogos.map((brand, idx) => (
            <span 
              key={idx} 
              className="text-lg md:text-xl font-bold font-mono tracking-tight text-slate-700 dark:text-slate-300 hover:text-accent-primary hover:opacity-100 transition-all duration-200 cursor-default"
            >
              {brand.text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Testimonial Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="section-label">User Reviews</span>
        <H2 className="text-[#08111A] dark:text-white font-extrabold tracking-tight mb-4 text-balance">
          Loved by builders and finance professionals.
        </H2>
        <Body className="text-slate-600 dark:text-slate-300">
          Hear how Arivo helps users optimize their capital, discover leaks, and automate wealth management safely.
        </Body>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <Card key={idx} className="bg-surface border-slate-200/60 dark:border-slate-800/40 p-6 rounded-2xl flex flex-col justify-between hover:border-accent-primary/30">
            <div>
              <div className="flex gap-1 text-amber-500 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 dark:text-white block">
                {t.name}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {t.role}, {t.company}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

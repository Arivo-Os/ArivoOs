export interface Competitor {
  slug: string;
  name: string;
  title: string;
  description: string;
  arivoAdvantage: string;
  features: {
    name: string;
    arivo: string | boolean;
    competitor: string | boolean;
  }[];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "cleo",
    name: "Cleo",
    title: "Arivo vs Cleo: Which AI Financial Assistant is Right for You?",
    description: "Cleo is known for its sassy personality and Gen Z appeal. But when it comes to serious financial decisions in India, you need more than jokes. See how Arivo provides structured smart suggestions.",
    arivoAdvantage: "While Cleo focuses on gamified financial tracking and a sassy chatbot persona, Arivo acts as a serious Financial Decision Engine. Arivo is built for the Indian context, focusing on structured recommendations for big life decisions (like buying a car or taking a loan) rather than just daily expense tracking.",
    features: [
      { name: "AI Persona", arivo: "Objective Financial Expert", competitor: "Sassy & Conversational" },
      { name: "Decision Engine", arivo: true, competitor: false },
      { name: "Focus Area", arivo: "Major Financial Decisions", competitor: "Daily Spending Habits" },
      { name: "Indian Market Focus", arivo: true, competitor: false },
      { name: "Data Privacy", arivo: "No ads, no data selling", competitor: "Standard" },
    ]
  },
  {
    slug: "ynab",
    name: "YNAB",
    title: "Arivo vs YNAB (You Need A Budget)",
    description: "YNAB is a powerful methodology, but it requires significant manual effort. See how Arivo automates financial clarity using AI, without the strict rules.",
    arivoAdvantage: "YNAB requires you to manually assign every rupee to a category, which can be exhausting. Arivo takes a different approach: it analyzes your overall financial health and uses AI to answer your specific money questions, adapting to your life rather than forcing you into a rigid framework.",
    features: [
      { name: "Methodology", arivo: "AI Smart Suggestions", competitor: "Zero-Based Methodology" },
      { name: "Manual Effort Required", arivo: "Low (Automated Insights)", competitor: "High (Manual Allocation)" },
      { name: "Conversational AI", arivo: true, competitor: false },
      { name: "Scenario Analysis", arivo: true, competitor: false },
      { name: "Focus", arivo: "Strategic Financial Outcomes", competitor: "Strict Category Tracking" },
    ]
  },
  {
    slug: "monarch-money",
    name: "Monarch Money",
    title: "Arivo vs Monarch Money",
    description: "Monarch Money offers beautiful dashboards for tracking net worth. But dashboards don't make decisions. Discover why Arivo's AI-driven insights go beyond just showing you charts.",
    arivoAdvantage: "Monarch gives you excellent charts and graphs to track your wealth. However, when you face a major financial choice, you still have to interpret those charts yourself. Arivo's AI actively analyzes your profile to give you a definitive verdict—Proceed, Wait, or Reconsider—before you spend.",
    features: [
      { name: "Core Value", arivo: "Actionable AI Advice", competitor: "Comprehensive Dashboards" },
      { name: "AI Assistant", arivo: "Deeply Integrated", competitor: "Basic/Add-on" },
      { name: "Actionable Verdicts", arivo: true, competitor: false },
      { name: "Contextual Guidance", arivo: true, competitor: "User Interpretation Required" },
    ]
  }
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find(c => c.slug === slug);
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Arivo?",
    answer:
      "Arivo is an AI-powered personal finance platform built for India. It acts as your AI Financial Assistant, helping you understand your financial health, track spending automatically, build budgets, and get personalized advice.",
  },
  {
    question: "Is Arivo a bank?",
    answer:
      "No. Arivo is an AI Financial Assistant, not a bank. We connect to your accounts to provide insights and help you manage your money, but we do not hold, move, or invest your money.",
  },
  {
    question: "How does the AI Financial Advisor work?",
    answer:
      "The AI Financial Advisor, Veris, analyzes your connected financial data—including income, expenses, and savings goals—to answer your questions in plain language and provide objective guidance before you spend, borrow, or invest.",
  },
  {
    question: "Is my financial data safe with Arivo?",
    answer:
      "Yes. Your financial data is private, encrypted in transit, and never sold to third parties. Arivo does not sell financial products, earn referral commissions, or share your data with advertisers.",
  },
  {
    question: "How do I get access to Arivo?",
    answer:
      "Arivo is available directly on the web. You can sign in using Google to start tracking goals and planning your finances immediately. We are also running a closed beta on Google Play for our Android app.",
  },
  {
    question: "Is Arivo free to use?",
    answer:
      "Waitlist and direct web access are currently free. Early users help shape the product and get priority access. Premium tiers may be introduced in the future.",
  },
  {
    question: "What features does Arivo offer?",
    answer:
      "Arivo offers a complete financial dashboard, AI financial assistant, goal tracking, smart spending insights, budget planning tools, and secure-by-design privacy.",
  },
  {
    question: "Is Arivo available on mobile and web?",
    answer:
      "Yes. Arivo is available on the web from any desktop or mobile browser. It is also available as a closed beta Android app on Google Play.",
  },
  {
    question: "Can Arivo help with credit score and budgeting?",
    answer:
      "Arivo provides smart analytics to understand spending patterns and plan budgets around your goals. Credit score analysis and deeper insights are planned for upcoming releases.",
  },
];

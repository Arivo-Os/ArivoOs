export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Arivo?",
    answer:
      "Arivo is a personal finance companion built for India. It acts as your intelligent workspace, helping you calculate net worth, visualize asset distributions, and receive personalized decision diagnostics based on self-reported inputs.",
  },
  {
    question: "Is Arivo a bank?",
    answer:
      "No. Arivo is a financial decision companion, not a bank. We help you analyze your financial profile and simulate choices, but we do not hold, move, or invest your money.",
  },
  {
    question: "How does the AI Companion work?",
    answer:
      "Our AI assistant, Veris, analyzes the variables in your secure financial profile—including self-reported income, expenses, and savings goals—to answer your questions in plain language and provide educational decision support.",
  },
  {
    question: "Is my financial data safe with Arivo?",
    answer:
      "Yes. Your financial data is private, encrypted in transit, and never sold to third parties. Arivo does not sell financial products, earn referral commissions, or share your details with advertisers.",
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
      "Arivo offers a complete financial dashboard, an AI decision companion, goal progress trackers, smart diagnostics, strategic planning tools, and secure-by-design privacy.",
  },
  {
    question: "Is Arivo available on mobile and web?",
    answer:
      "Yes. Arivo is available on the web from any desktop or mobile browser. It is also available as a closed beta Android app on Google Play.",
  },
  {
    question: "Can Arivo help with credit score and financial planning?",
    answer:
      "Arivo provides smart analytics to understand spending patterns and plan your finances around your goals. Credit score analysis and deeper insights are planned for upcoming releases.",
  },
];

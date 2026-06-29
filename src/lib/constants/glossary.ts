export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  arivoContext: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: "cibil-score",
    term: "CIBIL Score",
    definition: "A three-digit numeric summary of your credit history, rating your ability to repay debt. In India, it ranges from 300 to 900. Higher scores get you better loan terms.",
    arivoContext: "While a CIBIL score tells a bank if you are eligible for a loan, Arivo tells you if you should actually take that loan based on your income and current expenses."
  },
  {
    slug: "emi",
    term: "Equated Monthly Installment (EMI)",
    definition: "A fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.",
    arivoContext: "Before committing to a new EMI (like buying a car), Arivo projects how that fixed monthly payment will impact your ability to save and build an emergency fund over the next 3 to 5 years."
  },
  {
    slug: "sip",
    term: "Systematic Investment Plan (SIP)",
    definition: "A facility offered by mutual funds to investors to invest in a disciplined manner. The facility allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme.",
    arivoContext: "Arivo analyzes your variable cash flow and helps determine the optimal, sustainable SIP amount you should commit to without risking cash shortages during expensive months."
  },
  {
    slug: "epf",
    term: "Employee Provident Fund (EPF)",
    definition: "A retirement benefit scheme available to salaried employees in India. Both the employee and the employer contribute a portion of the basic salary (usually 12%) to the fund.",
    arivoContext: "Arivo views your EPF as a long-term, illiquid asset. When evaluating your emergency readiness, Arivo intentionally excludes your EPF balance, forcing you to build accessible cash reserves."
  },
  {
    slug: "emergency-fund",
    term: "Emergency Fund",
    definition: "A highly liquid cash reserve specifically set aside for unplanned expenses or financial emergencies, such as medical bills or sudden job loss. A standard rule of thumb is 3 to 6 months of living expenses.",
    arivoContext: "An emergency fund is the bedrock of Arivo's decision intelligence. Arivo will almost never recommend a major discretionary purchase if your emergency fund is below the safety threshold."
  },
  {
    slug: "decision-intelligence",
    term: "Decision Intelligence",
    definition: "The application of AI and data analytics to support, augment, and automate business or personal decisions.",
    arivoContext: "Arivo is built entirely on decision intelligence. Instead of just showing you pie charts of past spending, Arivo processes your data to deliver definitive answers: 'Proceed', 'Wait', or 'Reconsider'."
  },
  {
    slug: "debt-to-income-ratio",
    term: "Debt-to-Income Ratio (DTI)",
    definition: "A personal finance measure that compares an individual's monthly debt payment to their monthly gross income.",
    arivoContext: "Arivo constantly monitors your DTI. If you ask Arivo whether you can afford a new phone on EMI, it calculates the new DTI before giving you an answer."
  }
];

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find(t => t.slug === slug);
}

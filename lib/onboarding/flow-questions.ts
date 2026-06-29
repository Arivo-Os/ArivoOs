export const FLOW_QUESTIONS = [
  "Can I buy this car?",
  "Should I invest ₹50,000?",
  "Can I afford a Bali trip?",
  "Can I move out?",
  "Can I take this loan?",
] as const;

export const FLOW_QUESTION_KEY = "arivo_flow_question";

export function setFlowQuestion(question: string) {
  if (typeof window === "undefined") return;
  const trimmed = question.trim();
  if (!trimmed) {
    sessionStorage.removeItem(FLOW_QUESTION_KEY);
    return;
  }
  sessionStorage.setItem(FLOW_QUESTION_KEY, trimmed);
}

export function peekFlowQuestion(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(FLOW_QUESTION_KEY);
}

export function consumeFlowQuestion(): string | null {
  const question = peekFlowQuestion();
  if (question) sessionStorage.removeItem(FLOW_QUESTION_KEY);
  return question;
}

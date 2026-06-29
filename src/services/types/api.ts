/** Global API envelope */
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ApiErrorBody {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    path?: string;
  };
  timestamp: string;
}

export interface ApiUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string | null;
  monthlyIncome?: number;
  subscriptionTier?: string;
  onboardingComplete?: boolean;
}

export interface SendOtpResponse {
  message: string;
  phone: string;
  expiresIn: number;
  otp?: string | null;
  channel?: string;
}

export interface VerifyOtpResponse {
  user: ApiUser;
  isNewUser: boolean;
  accessToken: string;
  refreshToken: string;
}

export type AuthTokenResponse = VerifyOtpResponse;

export interface GoogleLoginRequest {
  idToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile extends ApiUser {
  financialInputs?: FinancialInputs;
}

export interface FinancialInputs {
  monthlyExpenses?: number;
  totalDebt?: number;
  monthlyDebtPayment?: number;
  currentSavings?: number;
  billsDue?: number;
  retirementTargetAmount?: number;
  retirementTargetDate?: string;
  retirementAge?: number;
  riskPreference?: string;
}

export interface ReasoningFact {
  text: string;
  highlight?: string;
  type?: "warning" | "positive" | "neutral";
}

export interface VerisDecision {
  verdictTitle: string;
  verdictType: "positive" | "caution" | "negative";
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  verdictSummary: string;
  reasoningFacts?: ReasoningFact[];
  nextAction?: string;
  suggestionPills?: string[];
  suggestionPillKeys?: string[];
}

export interface InputRequest {
  type: string;
  mode?: string;
  currentField?: string;
  label?: string;
  keyboardType?: string;
  collected?: Record<string, unknown>;
  remaining?: string[];
}

export interface ChatMessagePayload {
  role: "user" | "assistant";
  type?: string;
  content: string;
  createdAt?: string;
  inputRequest?: InputRequest | null;
}

export interface VerisChatResponse {
  conversationId: string;
  message: ChatMessagePayload;
  decision?: VerisDecision | null;
  details?: {
    sections?: unknown[];
    metrics?: Record<string, number | null> | null;
    affordability?: Record<string, unknown> | null;
    profile?: unknown;
  };
  suggestionPills?: string[];
  suggestionPillKeys?: string[];
  workflowProgress?: string[];
  inputRequest?: InputRequest | null;
  needsInput?: {
    status: string;
    question?: string;
    field?: string;
  };
  replacesPriorDecision?: boolean;
  userProfile?: Record<string, unknown>;
  responseType?: string;
  responseFormat?: string;
  structuredContent?: { type: string; title?: string; summary?: string; items?: unknown[] };
  aiDailyUsed?: number;
  aiDailyLimit?: number;
  aiDailyRemaining?: number;
}

export interface DashboardRecommendation {
  id: string;
  title: string;
  priority: string;
  reason: string;
  impactScore?: number;
  action?: string;
  type?: string;
}

export interface DashboardData {
  financialHealthScore: number;
  financialGrade?: string;
  biggestImprovement?: string;
  recommendations: DashboardRecommendation[];
  activeGoals?: ApiGoal[];
  recentDecisions?: unknown[];
  profileCompletion?: number;
  missingProfileFields?: string[];
}

export interface ApiGoal {
  id: string;
  goalName: string;
  goalType: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  monthlyContribution?: number;
  monthlyRequired?: number;
  isOnTrack?: boolean;
  healthScore?: number;
  healthStatus?: string;
  recommendedAction?: string;
  percentComplete: number;
}

export interface FinancialHealthScore {
  overallScore: number;
  savingsScore?: number;
  investmentScore?: number;
  debtScore?: number;
  insuranceScore?: number;
  emergencyFundScore?: number;
  calculatedAt?: string;
}

export interface FinancialProfileSummary {
  netWorth?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  cashBalance?: number;
  investmentValue?: number;
  totalDebt?: number;
  financialHealthScore?: number;
}

export interface OutcomeRecord {
  id: string;
  recommendationId: string;
  outcomeStatus: string;
  financialImpactExpected?: number;
  scheduledVerificationAt?: string;
  recommendation?: {
    id: string;
    title: string;
    type?: string;
    status?: string;
  };
}

export interface RecommendationCenter {
  high: RecommendationCard[];
  medium: RecommendationCard[];
  low: RecommendationCard[];
  snoozed: RecommendationCard[];
  suppressed?: number;
  total: number;
}

export interface RecommendationCard {
  id: string;
  type: string;
  title: string;
  description: string;
  reason?: string;
  action?: string;
  financialImpact?: number;
  confidenceScore?: number;
  priorityBand?: string;
  status?: string;
  aiExplanation?: string;
}

export interface CreateGoalPayload {
  goalName: string;
  goalType: string;
  targetAmount: number;
  currentAmount?: number;
  targetDate?: string;
  monthlyContribution?: number;
}

export interface DecisionHistoryRecord {
  decisionId: string;
  decisionType?: string;
  query: string;
  decision: string;
  confidence?: number;
  reasoning?: string;
  snapshotId?: string;
  reasonCodes?: string[];
  timestamp: string;
}

export interface JourneyTimelineEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  type: "decision" | "outcome" | "goal" | "conversation";
  badge?: string;
}

export interface ConversationSummary {
  sessionId: string;
  title: string;
  updatedAt?: string;
  preview?: string;
}

export interface StoredConversationMessage {
  role: "user" | "assistant";
  content: string;
  decision?: VerisDecision | null;
}

export interface StoredConversation {
  sessionId: string;
  title?: string;
  messages: StoredConversationMessage[];
}

export interface UpdateFinancialInputsPayload {
  fullName?: string;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  totalDebt?: number;
  monthlyDebtPayment?: number;
  currentSavings?: number;
  riskPreference?: string;
  dateOfBirth?: string;
}

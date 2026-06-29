import { apiClient, hasApiConfigured, unwrap } from "@/services/client";
import type { FinancialProfileSummary, UpdateFinancialInputsPayload, UserProfile } from "@/services/types/api";
import { mockProfile } from "@/services/mock-data";

export interface VaultData {
  profile: UserProfile;
  summary: FinancialProfileSummary;
}

let mockVaultOverrides: UpdateFinancialInputsPayload = {};

function buildMockVault(): VaultData {
  const inputs = {
    monthlyExpenses: mockVaultOverrides.monthlyExpenses ?? mockProfile.expenses,
    totalDebt: mockVaultOverrides.totalDebt ?? mockProfile.debt,
    currentSavings: mockVaultOverrides.currentSavings ?? mockProfile.savings,
    monthlyDebtPayment: mockVaultOverrides.monthlyDebtPayment,
    riskPreference: mockVaultOverrides.riskPreference ?? mockProfile.riskProfile,
  };
  const income = mockVaultOverrides.monthlyIncome ?? mockProfile.income;

  return {
    profile: {
      id: "1",
      fullName: mockVaultOverrides.fullName ?? "Akhilesh",
      email: "akhilesh@arivoai.in",
      monthlyIncome: income,
      financialInputs: inputs,
    },
    summary: {
      netWorth: mockProfile.netWorth,
      monthlyIncome: income,
      monthlyExpenses: inputs.monthlyExpenses,
      totalDebt: inputs.totalDebt,
      cashBalance: inputs.currentSavings,
      financialHealthScore: mockProfile.healthScore,
    },
  };
}

export async function getVaultData(): Promise<VaultData> {
  if (!hasApiConfigured()) {
    return buildMockVault();
  }

  const [profileRes, summaryRes] = await Promise.all([
    apiClient.get("/users/profile"),
    apiClient.get("/financial-profile/summary"),
  ]);

  return {
    profile: unwrap(profileRes) as UserProfile,
    summary: unwrap(summaryRes) as FinancialProfileSummary,
  };
}

export async function updateFinancialInputs(inputs: UpdateFinancialInputsPayload) {
  if (!hasApiConfigured()) {
    mockVaultOverrides = { ...mockVaultOverrides, ...inputs };
    return buildMockVault();
  }
  const res = await apiClient.patch("/users/financial-inputs", inputs);
  return unwrap(res);
}

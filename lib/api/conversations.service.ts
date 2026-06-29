import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import { mockDecisions } from "@/lib/api/mock-data";
import { normalizeList } from "@/lib/api/normalize";
import type { ConversationSummary, StoredConversation, VerisDecision } from "@/lib/api/types/api";

function mapSummary(raw: Record<string, unknown>): ConversationSummary {
  const sessionId = String(raw.sessionId ?? raw.conversationId ?? raw.id ?? "");
  return {
    sessionId,
    title: String(raw.title ?? raw.preview ?? raw.lastMessage ?? raw.subject ?? "Conversation"),
    updatedAt: String(raw.updatedAt ?? raw.createdAt ?? raw.timestamp ?? ""),
    preview: raw.preview ? String(raw.preview) : raw.lastMessage ? String(raw.lastMessage) : undefined,
  };
}

function mapMessage(raw: Record<string, unknown>) {
  const role = raw.role === "user" ? "user" : "assistant";
  const content = String(raw.content ?? raw.message ?? raw.text ?? "");
  const decision = (raw.decision as VerisDecision | null | undefined) ?? null;
  return { role: role as "user" | "assistant", content, decision };
}

function mapStoredConversation(raw: Record<string, unknown>): StoredConversation | null {
  const sessionId = String(raw.sessionId ?? raw.conversationId ?? raw.id ?? "");
  if (!sessionId) return null;

  const messageSource =
    raw.messages ?? raw.turns ?? raw.history ?? raw.items ?? [];
  const messages = normalizeList<Record<string, unknown>>(messageSource)
    .map(mapMessage)
    .filter((m) => m.content.trim());

  return {
    sessionId,
    title: raw.title ? String(raw.title) : undefined,
    messages,
  };
}

export async function getConversations(): Promise<ConversationSummary[]> {
  if (!hasApiConfigured()) {
    return mockDecisions.map((d) => ({
      sessionId: d.id,
      title: d.question,
      updatedAt: d.createdAt,
      preview: d.recommendation,
    }));
  }

  const res = await apiClient.get("/ai-copilot/conversations");
  const data = unwrap(res);
  return normalizeList<Record<string, unknown>>(data)
    .map(mapSummary)
    .filter((c) => c.sessionId);
}

export async function getConversation(sessionId: string): Promise<StoredConversation | null> {
  if (!hasApiConfigured()) {
    const match = mockDecisions.find((d) => d.id === sessionId);
    if (!match) return null;
    return {
      sessionId: match.id,
      title: match.question,
      messages: [
        { role: "user", content: match.question },
        { role: "assistant", content: match.recommendation },
      ],
    };
  }

  const res = await apiClient.get(`/ai-copilot/conversations/${sessionId}`);
  const data = unwrap(res);
  if (Array.isArray(data)) {
    return {
      sessionId,
      messages: normalizeList<Record<string, unknown>>(data).map(mapMessage).filter((m) => m.content.trim()),
    };
  }
  return mapStoredConversation(data as Record<string, unknown>);
}

export async function deleteConversation(sessionId: string): Promise<void> {
  if (!hasApiConfigured()) {
    return;
  }
  await apiClient.delete(`/ai-copilot/conversations/${sessionId}`);
}

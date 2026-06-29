"use client";

import { History, MessageSquarePlus, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConversationSummary } from "@/services/types/api";

function formatWhen(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

interface VerisConversationHistoryProps {
  conversations: ConversationSummary[];
  activeId?: string;
  loading?: boolean;
  onSelect: (sessionId: string) => void;
  onNewChat: () => void;
  onDelete?: (sessionId: string) => void;
  className?: string;
}

export function VerisConversationHistory({
  conversations,
  activeId,
  loading,
  onSelect,
  onNewChat,
  onDelete,
  className,
}: VerisConversationHistoryProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-app-border bg-app-card shadow-app-sm", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-app-border px-4 py-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-app-accent" />
          <h2 className="text-sm font-semibold text-app-text">History</h2>
        </div>
        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-app-accent transition-colors hover:bg-app-accent-muted"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />
          New
        </button>
      </div>

      <div className="max-h-[min(70vh,520px)] flex-1 overflow-y-auto p-2">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-app-muted">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading…
          </div>
        )}

        {!loading && conversations.length === 0 && (
          <p className="px-2 py-6 text-center text-xs leading-relaxed text-app-muted">
            No past chats yet. Ask Veris a question to start your history.
          </p>
        )}

        {!loading &&
          conversations.map((c) => {
            const active = c.sessionId === activeId;
            return (
              <div
                key={c.sessionId}
                className={cn(
                  "group relative mb-1 flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ease-out hover:translate-x-1 transform",
                  active
                    ? "bg-app-accent-muted text-app-text"
                    : "text-app-muted hover:bg-app-bg hover:text-app-text"
                )}
              >
                <button
                  type="button"
                  onClick={() => onSelect(c.sessionId)}
                  className="flex-1 text-left"
                >
                  <p className="line-clamp-2 text-sm font-medium pr-6">{c.title}</p>
                  {c.preview && (
                    <p className="mt-0.5 line-clamp-1 text-xs opacity-80 pr-6">{c.preview}</p>
                  )}
                  {c.updatedAt && (
                    <p className="mt-1 text-[10px] uppercase tracking-wide opacity-60">{formatWhen(c.updatedAt)}</p>
                  )}
                </button>
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(c.sessionId);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

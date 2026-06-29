"use client";

import React, { createContext, useContext, useState } from "react";
import type { ConversationSummary } from "@/services/types/api";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  // Veris history states
  conversations: ConversationSummary[];
  setConversations: (conversations: ConversationSummary[]) => void;
  activeSessionId?: string;
  setActiveSessionId: (id?: string) => void;
  loadingHistory: boolean;
  setLoadingHistory: (loading: boolean) => void;
  onNewChat: (() => void) | null;
  setOnNewChat: (fn: (() => void) | null) => void;
  onDeleteConversation: ((id: string) => void) | null;
  setOnDeleteConversation: (fn: ((id: string) => void) | null) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [onNewChat, setOnNewChat] = useState<(() => void) | null>(null);
  const [onDeleteConversation, setOnDeleteConversation] = useState<((id: string) => void) | null>(null);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        conversations,
        setConversations,
        activeSessionId,
        setActiveSessionId,
        loadingHistory,
        setLoadingHistory,
        onNewChat,
        setOnNewChat,
        onDeleteConversation,
        setOnDeleteConversation,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

import React from "react";
import SideMenu from "../SideMenu";
import type { AppId } from "../types";
import type { TranslationClient } from "../translationClient";

export interface AppShellProps {
  children: React.ReactNode;
  currentAppId: AppId;
  translationClient: TranslationClient;
}

/**
 * Full-page dark shell: side menu + scrollable main content area.
 * Replaces each app's AppLayout.tsx — nothing else needed.
 */
export function AppShell({ children, currentAppId, translationClient }: AppShellProps) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "#232d2e", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      <SideMenu currentAppId={currentAppId} translationClient={translationClient} />
      <main
        className="flex-1 overflow-auto px-5 py-7 md:px-10 md:py-10"
        style={{ color: "hsl(200,100%,92%)" }}
      >
        {children}
      </main>
    </div>
  );
}

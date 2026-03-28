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
 * All layout uses inline styles + embedded CSS to avoid depending on
 * Tailwind scanning node_modules.
 */
export function AppShell({ children, currentAppId, translationClient }: AppShellProps) {
  return (
    <>
      <style>{`
        .trf-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: rgb(18, 24, 26);
          font-family: 'Space Grotesk', system-ui, sans-serif;
        }
        @media (min-width: 768px) {
          .trf-shell { flex-direction: row; }
        }
        .trf-shell-main {
          flex: 1;
          overflow: auto;
          padding: 1.75rem 1.25rem;
          color: rgb(212, 228, 237);
        }
        @media (min-width: 768px) {
          .trf-shell-main { padding: 2.5rem 2.5rem; }
        }
        @media (min-width: 1024px) {
          .trf-shell-main { padding: 2.5rem 3rem; }
        }
      `}</style>
      <div className="trf-shell">
        <SideMenu currentAppId={currentAppId} translationClient={translationClient} />
        <main className="trf-shell-main">
          {children}
        </main>
      </div>
    </>
  );
}

import React from "react";

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

/** Centred empty-state message. Dark-themed to sit naturally in AppShell. */
export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div
      className="rounded-xl p-8 text-center"
      style={{
        background: "hsl(190, 14%, 17%)",
        border: "1px solid hsl(192, 14%, 25%)",
      }}
    >
      <p style={{ opacity: 0.6, marginBottom: action ? "1rem" : 0 }}>{message}</p>
      {action}
    </div>
  );
}

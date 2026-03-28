import React from "react";

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

/**
 * Centred empty-state message. Renders as a white card — works inside a dark AppShell.
 */
export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-900">
      <p className="text-slate-500 mb-4">{message}</p>
      {action}
    </div>
  );
}

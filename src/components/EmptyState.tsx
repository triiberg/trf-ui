import React from "react";

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ message, action, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-8 text-center ${className}`}
    >
      <p className="text-slate-500 mb-4">{message}</p>
      {action}
    </div>
  );
}

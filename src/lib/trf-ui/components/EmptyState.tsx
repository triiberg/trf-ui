import React from "react";

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div
      style={{
        background: "hsl(192, 14%, 16%)",
        border: "1px solid hsl(192, 12%, 22%)",
        borderRadius: "0.875rem",
        padding: "3rem 2rem",
        textAlign: "center",
      }}
    >
      <p style={{ color: "hsl(200, 25%, 50%)", margin: "0 0 1rem", fontSize: "0.875rem" }}>
        {message}
      </p>
      {action}
    </div>
  );
}

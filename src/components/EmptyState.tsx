import React from "react";

export interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div style={{
      background: "rgb(35, 44, 47)",
      border: "1px solid rgb(49, 60, 63)",
      borderRadius: "0.875rem",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "rgba(0,0,0,0.2) 0px 1px 3px",
    }}>
      <p style={{ color: "rgb(106, 152, 175)", marginBottom: action ? "1rem" : 0 }}>{message}</p>
      {action}
    </div>
  );
}

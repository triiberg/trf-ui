import React from "react";

export interface ErrorBoxProps {
  children: React.ReactNode;
}

export function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <div style={{
      background: "rgba(220, 50, 50, 0.12)",
      border: "1px solid rgba(220, 50, 50, 0.3)",
      borderRadius: "0.625rem",
      padding: "0.75rem 1rem",
    }}>
      <p style={{ fontSize: "0.875rem", color: "rgb(255, 140, 130)", margin: 0 }}>{children}</p>
    </div>
  );
}

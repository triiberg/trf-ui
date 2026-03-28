import React from "react";

export interface ErrorBoxProps {
  children: React.ReactNode;
}

export function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <div
      style={{
        borderRadius: "0.5rem",
        border: "1px solid hsla(350, 65%, 50%, 0.3)",
        background: "hsla(350, 65%, 50%, 0.08)",
        padding: "0.75rem 1rem",
        maxWidth: "28rem",
      }}
    >
      <p style={{ fontSize: "0.8125rem", color: "hsl(350, 65%, 65%)", margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

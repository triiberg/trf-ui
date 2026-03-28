import React from "react";

export interface InfoPanelProps {
  title?: string;
  children: React.ReactNode;
}

export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div style={{
      background: "rgb(43, 52, 54)",
      border: "1px solid rgb(54, 66, 69)",
      borderRadius: "0.625rem",
      padding: "1rem 1.25rem",
    }}>
      {title && (
        <p style={{
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "rgb(184, 211, 224)",
          margin: "0 0 0.625rem",
        }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

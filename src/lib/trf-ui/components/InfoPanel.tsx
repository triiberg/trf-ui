import React from "react";

export interface InfoPanelProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Slightly lighter surface panel for supplementary information.
 * Works inside dark Cards or directly on the shell.
 */
export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div
      style={{
        background: "hsl(192, 12%, 19%)",
        border: "1px solid hsl(192, 12%, 24%)",
        borderRadius: "0.625rem",
        padding: "1rem 1.25rem",
      }}
    >
      {title && (
        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "hsl(200, 40%, 80%)",
            margin: "0 0 0.625rem",
          }}
        >
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

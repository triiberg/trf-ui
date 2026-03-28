import React from "react";

export interface StepCardProps {
  step: number;
  title: string;
  subtitle?: string;
  summary?: string;
  open: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

export function StepCard({ step, title, subtitle, summary, open, onOpen, children }: StepCardProps) {
  return (
    <div
      style={{
        background: open ? "hsl(192, 14%, 16%)" : "hsl(192, 12%, 14%)",
        border: `1px solid ${open ? "hsl(195, 60%, 35%)" : "hsl(192, 12%, 22%)"}`,
        borderRadius: "0.875rem",
        overflow: "hidden",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.125rem 1.5rem",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              display: "inline-flex",
              height: "1.75rem",
              width: "1.75rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              fontSize: "0.8125rem",
              fontWeight: 700,
              flexShrink: 0,
              background: open ? "hsla(195, 80%, 45%, 0.2)" : "hsl(192, 12%, 22%)",
              color: open ? "hsl(195, 80%, 65%)" : "hsl(200, 30%, 55%)",
            }}
          >
            {step}
          </span>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 600, margin: 0, color: "hsl(200, 40%, 90%)" }}>
              {title}
            </p>
            {subtitle && (
              <p style={{ fontSize: "0.8125rem", opacity: 0.5, margin: "0.125rem 0 0" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <span style={{ fontSize: "0.8125rem", color: "hsl(200, 30%, 50%)", flexShrink: 0, marginLeft: "1rem" }}>
          {open ? "▲" : (summary ?? "▼")}
        </span>
      </button>
      {open && (
        <div style={{ borderTop: "1px solid hsl(192, 12%, 22%)", padding: "1.5rem" }}>
          {children}
        </div>
      )}
    </div>
  );
}

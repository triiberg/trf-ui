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
    <div style={{
      background: "rgb(35, 44, 47)",
      border: "1px solid rgb(49, 60, 63)",
      borderRadius: "0.875rem",
      boxShadow: "rgba(0,0,0,0.3) 0px 1px 3px, rgba(0,0,0,0.15) 0px 8px 24px",
      overflow: "hidden",
    }}>
      <button
        type="button"
        onClick={onOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgb(212, 228, 237)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{
            display: "inline-flex",
            width: "1.75rem",
            height: "1.75rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "9999px",
            fontSize: "0.8125rem",
            fontWeight: 700,
            flexShrink: 0,
            background: "rgba(0, 210, 200, 0.12)",
            border: "1px solid rgba(0, 210, 200, 0.3)",
            color: "hsl(185, 100%, 65%)",
          }}>
            {step}
          </span>
          <div>
            <p style={{ fontSize: "0.9375rem", fontWeight: 600, margin: 0, color: "inherit" }}>{title}</p>
            {subtitle && (
              <p style={{ fontSize: "0.8125rem", margin: "0.25rem 0 0", color: "rgb(106, 152, 175)" }}>{subtitle}</p>
            )}
          </div>
        </div>
        <span style={{ fontSize: "0.8125rem", color: "rgb(82, 109, 122)", flexShrink: 0, marginLeft: "1rem" }}>
          {open ? "▲" : (summary ?? "▼")}
        </span>
      </button>
      {open && (
        <div style={{
          borderTop: "1px solid rgb(49, 60, 63)",
          padding: "1.5rem",
          color: "rgb(212, 228, 237)",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

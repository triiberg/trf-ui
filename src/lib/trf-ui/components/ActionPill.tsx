import React from "react";

export type ActionPillVariant = "default" | "selected" | "danger" | "amber" | "primary";

const VARIANT_STYLES: Record<ActionPillVariant, React.CSSProperties> = {
  default: {
    background: "hsl(192, 12%, 22%)",
    color: "hsl(200, 40%, 80%)",
    border: "1px solid hsl(192, 12%, 28%)",
  },
  selected: {
    background: "hsla(195, 80%, 45%, 0.15)",
    color: "hsl(195, 80%, 65%)",
    border: "1px solid hsla(195, 80%, 45%, 0.3)",
  },
  danger: {
    background: "hsla(350, 70%, 50%, 0.12)",
    color: "hsl(350, 70%, 65%)",
    border: "1px solid hsla(350, 70%, 50%, 0.25)",
  },
  amber: {
    background: "hsla(38, 80%, 50%, 0.15)",
    color: "hsl(38, 80%, 65%)",
    border: "1px solid hsla(38, 80%, 50%, 0.25)",
  },
  primary: {
    background: "hsl(195, 80%, 42%)",
    color: "#fff",
    border: "none",
  },
};

const BASE_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  borderRadius: "9999px",
  padding: "0.25rem 0.75rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "opacity 0.15s",
};

export interface ActionPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionPillVariant;
}

export function ActionPill({ variant = "default", children, style, ...props }: ActionPillProps) {
  return (
    <button
      type="button"
      {...props}
      style={{ ...BASE_STYLE, ...VARIANT_STYLES[variant], ...style }}
    >
      {children}
    </button>
  );
}

export interface ActionPillBadgeProps {
  variant?: ActionPillVariant;
  children: React.ReactNode;
}

export function ActionPillBadge({ variant = "selected", children }: ActionPillBadgeProps) {
  return (
    <span style={{ ...BASE_STYLE, cursor: "default", ...VARIANT_STYLES[variant] }}>
      {children}
    </span>
  );
}

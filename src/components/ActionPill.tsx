import React from "react";

export type ActionPillVariant = "default" | "selected" | "danger" | "amber" | "primary";

const BASE_STYLE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "9999px",
  padding: "0.25rem 0.75rem",
  fontSize: "0.75rem",
  transition: "opacity 0.15s",
  cursor: "pointer",
  border: "none",
};

const VARIANT_STYLE: Record<ActionPillVariant, React.CSSProperties> = {
  default:  { background: "rgba(212,228,237,0.08)", border: "1px solid rgba(212,228,237,0.15)", color: "rgb(212, 228, 237)" },
  selected: { background: "rgba(0,210,200,0.12)", border: "1px solid rgba(0,210,200,0.3)", color: "hsl(185,100%,72%)", fontWeight: 600 },
  danger:   { background: "rgba(220,50,50,0.12)", border: "1px solid rgba(220,50,50,0.3)", color: "rgb(255,140,130)", fontWeight: 600 },
  amber:    { background: "rgba(245,160,50,0.12)", border: "1px solid rgba(245,160,50,0.3)", color: "rgb(255,195,100)", fontWeight: 600 },
  primary:  { background: "hsl(185,100%,45%)", color: "rgb(10,30,32)", fontWeight: 700 },
};

export interface ActionPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionPillVariant;
}

export function ActionPill({ variant = "default", children, style, ...props }: ActionPillProps) {
  return (
    <button
      type="button"
      {...props}
      style={{ ...BASE_STYLE, ...VARIANT_STYLE[variant], ...style }}
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
    <span style={{ ...BASE_STYLE, ...VARIANT_STYLE[variant], cursor: "default" }}>
      {children}
    </span>
  );
}

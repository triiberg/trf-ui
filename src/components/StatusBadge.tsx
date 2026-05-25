import React from "react";

export type StatusBadgeVariant = "pending" | "sent" | "failed" | "active" | "inactive" | "warning";

const VARIANT_STYLE: Record<StatusBadgeVariant, React.CSSProperties> = {
  pending:  { background: "rgba(245,180,60,0.12)",  color: "rgb(255,200,100)",  border: "1px solid rgba(245,180,60,0.3)"  },
  sent:     { background: "rgba(80,200,120,0.12)",   color: "rgb(80,200,120)",   border: "1px solid rgba(80,200,120,0.25)" },
  failed:   { background: "rgba(255,140,130,0.12)",  color: "rgb(255,140,130)",  border: "1px solid rgba(255,140,130,0.25)"},
  active:   { background: "rgba(80,200,120,0.12)",   color: "rgb(80,200,120)",   border: "1px solid rgba(80,200,120,0.25)" },
  inactive: { background: "rgba(120,130,140,0.12)",  color: "rgb(160,175,185)",  border: "1px solid rgba(120,130,140,0.25)"},
  warning:  { background: "rgba(245,180,60,0.10)",   color: "rgb(245,180,60)",   border: "1px solid rgba(245,180,60,0.28)"},
};

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  children: React.ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span style={{
      display: "inline-block",
      padding: "0.125rem 0.5rem",
      borderRadius: "9999px",
      fontSize: "0.7rem",
      fontWeight: 500,
      ...VARIANT_STYLE[variant],
    }}>
      {children}
    </span>
  );
}

import React from "react";

export type ActionPillVariant = "default" | "selected" | "danger" | "amber" | "primary";

const BASE = "inline-flex items-center rounded-full px-3 py-1 text-xs transition-colors";

// All variants designed for dark backgrounds
const VARIANT: Record<ActionPillVariant, React.CSSProperties> = {
  default:  { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "inherit" },
  selected: { background: "hsl(185, 60%, 18%)", border: "1px solid hsl(185, 60%, 35%)", color: "hsl(185, 100%, 75%)", fontWeight: 600 },
  danger:   { background: "hsl(0, 40%, 18%)", border: "1px solid hsl(0, 50%, 35%)", color: "hsl(0, 80%, 72%)", fontWeight: 600 },
  amber:    { background: "hsl(38, 60%, 18%)", border: "1px solid hsl(38, 60%, 35%)", color: "hsl(38, 100%, 72%)", fontWeight: 600 },
  primary:  { background: "hsl(185, 100%, 40%)", color: "hsl(190, 80%, 10%)", fontWeight: 700 },
};

export interface ActionPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionPillVariant;
}

export function ActionPill({ variant = "default", children, ...props }: ActionPillProps) {
  return (
    <button type="button" {...props} className={BASE} style={VARIANT[variant]}>
      {children}
    </button>
  );
}

export interface ActionPillBadgeProps {
  variant?: ActionPillVariant;
  children: React.ReactNode;
}

export function ActionPillBadge({ variant = "selected", children }: ActionPillBadgeProps) {
  return <span className={BASE} style={VARIANT[variant]}>{children}</span>;
}

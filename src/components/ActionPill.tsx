import React from "react";

export type ActionPillVariant = "default" | "selected" | "danger" | "amber" | "primary";

const BASE = "inline-flex items-center rounded-full px-3 py-1 text-xs";

const VARIANT: Record<ActionPillVariant, string> = {
  default:  "bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50",
  selected: "bg-sky-100 text-sky-700 font-semibold",
  danger:   "bg-rose-50 border border-rose-200 text-rose-700 font-semibold hover:bg-rose-100",
  amber:    "bg-amber-100 text-amber-700 font-semibold",
  primary:  "bg-sky-600 text-white font-semibold hover:bg-sky-700",
};

export interface ActionPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionPillVariant;
}

/** Small rounded pill action button. For display-only use <ActionPillBadge>. */
export function ActionPill({ variant = "default", children, ...props }: ActionPillProps) {
  return (
    <button type="button" {...props} className={`${BASE} ${VARIANT[variant]}`}>
      {children}
    </button>
  );
}

export interface ActionPillBadgeProps {
  variant?: ActionPillVariant;
  children: React.ReactNode;
}

/** Non-interactive pill badge (no onClick). */
export function ActionPillBadge({ variant = "selected", children }: ActionPillBadgeProps) {
  return <span className={`${BASE} ${VARIANT[variant]}`}>{children}</span>;
}

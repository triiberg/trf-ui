import React from "react";

export type BadgeColor =
  | "slate"
  | "green"
  | "red"
  | "blue"
  | "sky"
  | "indigo"
  | "violet"
  | "emerald"
  | "purple"
  | "orange"
  | "amber";

const COLOR: Record<BadgeColor, string> = {
  slate: "bg-slate-100 text-slate-600",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-700",
  sky: "bg-sky-100 text-sky-700",
  indigo: "bg-indigo-100 text-indigo-700",
  violet: "bg-violet-100 text-violet-700",
  emerald: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
  amber: "bg-amber-100 text-amber-700",
};

export interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ color = "slate", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${COLOR[color]} ${className}`}
    >
      {children}
    </span>
  );
}

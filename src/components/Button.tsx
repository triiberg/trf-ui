import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed";

const SIZE: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-3",
};

// Gradient primary is applied via inline style; other variants use className only.
const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:   "text-white shadow-sm",
  secondary: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
  danger:    "bg-red-600 hover:bg-red-700 text-white",
  ghost:     "text-slate-500 hover:bg-white/10 hover:text-white",
};

const VARIANT_STYLE: Record<ButtonVariant, React.CSSProperties | undefined> = {
  primary:   { background: "linear-gradient(135deg, hsl(185,100%,45%), hsl(260,80%,55%), hsl(320,85%,50%))" },
  secondary: undefined,
  danger:    undefined,
  ghost:     undefined,
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      className={`${BASE} ${VARIANT_CLASS[variant]} ${SIZE[size]}`}
    />
  );
}

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

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:   "text-white shadow-sm",
  secondary: "hover:bg-white/10",
  danger:    "bg-red-600 hover:bg-red-700 text-white",
  ghost:     "hover:bg-white/10",
};

const VARIANT_STYLE: Record<ButtonVariant, React.CSSProperties> = {
  primary:   { background: "linear-gradient(135deg, hsl(185,100%,45%), hsl(260,80%,55%), hsl(320,85%,50%))" },
  secondary: { border: "1px solid rgba(255,255,255,0.2)", color: "inherit" },
  danger:    {},
  ghost:     { color: "inherit", opacity: 0.7 },
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

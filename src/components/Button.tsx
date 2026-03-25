import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "hover:bg-slate-100 text-slate-600",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    />
  );
}

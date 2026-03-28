import React from "react";

export type InputSize = "sm" | "md" | "lg";

const BASE =
  "border rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors";

const SIZE: Record<InputSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-3 py-2.5",
  lg: "text-base px-4 py-3",
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  block?: boolean;
  size?: InputSize;
}

export function Input({
  block = true,
  size = "md",
  className = "",
  style,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      style={{ background: "hsl(190, 20%, 92%)", borderColor: "hsl(190, 15%, 75%)", ...style }}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} focus:ring-sky-400 focus:border-sky-400 ${className}`}
    />
  );
}

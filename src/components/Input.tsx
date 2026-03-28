import React from "react";

export type InputSize = "sm" | "md" | "lg";

const BASE =
  "border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-colors";

const SIZE: Record<InputSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-3 py-2.5",
  lg: "text-base px-4 py-3",
};

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Adds w-full. Defaults to true — set false for inline/filter inputs. */
  block?: boolean;
  size?: InputSize;
}

export function Input({
  block = true,
  size = "md",
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} ${className}`}
    />
  );
}

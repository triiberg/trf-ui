import React from "react";
import type { InputSize } from "./Input";

const BASE =
  "border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-colors";

const SIZE: Record<InputSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-3 py-2.5",
  lg: "px-4 py-3",
};

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  block?: boolean;
  size?: InputSize;
}

export function Select({
  block = true,
  size = "md",
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} ${className}`}
    >
      {children}
    </select>
  );
}

import React from "react";
import type { InputSize } from "./Input";

const BASE =
  "border rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors";

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
  style,
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      style={{ background: "hsl(190, 20%, 92%)", borderColor: "hsl(190, 15%, 75%)", ...style }}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} ${className}`}
    >
      {children}
    </select>
  );
}

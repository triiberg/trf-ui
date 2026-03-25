import React from "react";
import type { InputSize } from "./Input";

const BASE =
  "border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400";

const SIZE: Record<InputSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-3 py-2",
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

import React from "react";
import type { InputSize } from "./Input";

const BASE =
  "border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors";

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
      style={{
        background: "rgb(25, 35, 38)",
        borderColor: "rgb(49, 60, 63)",
        color: "rgb(212, 228, 237)",
        ...style,
      }}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} ${className}`}
    >
      {children}
    </select>
  );
}

import React from "react";

export type InputSize = "sm" | "md" | "lg";

const BASE =
  "border rounded-lg focus:outline-none focus:ring-2 transition-colors";

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
      style={{
        background: "rgb(25, 35, 38)",
        borderColor: "rgb(49, 60, 63)",
        color: "rgb(212, 228, 237)",
        ...style,
      }}
      className={`${BASE} ${SIZE[size]} ${block ? "w-full" : ""} ${className}`}
    />
  );
}

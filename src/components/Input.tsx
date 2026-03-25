import React from "react";

export type InputSize = "sm" | "md";

const BASE =
  "border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400";

const SIZE: Record<InputSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-3 py-2",
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

import React from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  block?: boolean;
  size?: InputSize;
}

const SIZE_STYLES: Record<InputSize, React.CSSProperties> = {
  sm: { fontSize: "0.75rem", padding: "0.375rem 0.75rem" },
  md: { fontSize: "0.875rem", padding: "0.625rem 0.75rem" },
  lg: { fontSize: "1rem", padding: "0.75rem 1rem" },
};

export function Input({
  block = true,
  size = "md",
  style,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      style={{
        width: block ? "100%" : undefined,
        background: "hsl(192, 12%, 13%)",
        border: "1px solid hsl(192, 12%, 24%)",
        borderRadius: "0.5rem",
        color: "hsl(200, 40%, 92%)",
        outline: "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        ...SIZE_STYLES[size],
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "hsl(195, 80%, 45%)";
        e.currentTarget.style.boxShadow = "0 0 0 2px hsla(195, 80%, 45%, 0.25)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "hsl(192, 12%, 24%)";
        e.currentTarget.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

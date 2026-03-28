import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { fontSize: "0.75rem", padding: "0.375rem 0.875rem" },
  md: { fontSize: "0.875rem", padding: "0.5rem 1.125rem" },
  lg: { fontSize: "0.9375rem", padding: "0.625rem 1.375rem" },
};

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, hsl(185,100%,45%), hsl(260,80%,55%), hsl(320,85%,50%))",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 8px hsla(260, 80%, 55%, 0.3)",
  },
  secondary: {
    background: "hsl(192, 12%, 19%)",
    color: "hsl(200, 40%, 85%)",
    border: "1px solid hsl(192, 12%, 28%)",
  },
  danger: {
    background: "hsl(350, 65%, 50%)",
    color: "#fff",
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "hsl(200, 30%, 60%)",
    border: "none",
  },
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  style,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        borderRadius: "0.5rem",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "opacity 0.15s, transform 0.1s",
        letterSpacing: "0.01em",
        ...VARIANT_STYLES[variant],
        ...SIZE_STYLES[size],
        ...style,
      }}
    />
  );
}

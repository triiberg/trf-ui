import React from "react";

export type TextVariant = "default" | "muted" | "error" | "success" | "strong";
export type TextSize = "xs" | "sm" | "md";

export interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  as?: keyof React.JSX.IntrinsicElements;
}

const VARIANT_STYLE: Record<TextVariant, React.CSSProperties> = {
  default: { color: "inherit" },
  muted:   { color: "inherit", opacity: 0.6 },
  error:   { color: "hsl(0,80%,60%)" },
  success: { color: "hsl(145,55%,50%)" },
  strong:  { color: "inherit", fontWeight: 600 },
};

const SIZE_STYLE: Record<TextSize, React.CSSProperties> = {
  xs: { fontSize: "0.75rem" },
  sm: { fontSize: "0.8125rem" },
  md: { fontSize: "0.875rem" },
};

export function Text({ children, variant = "default", size = "md", as: Tag = "p" }: TextProps) {
  return (
    <Tag style={{ ...VARIANT_STYLE[variant], ...SIZE_STYLE[size], margin: 0 }}>
      {children}
    </Tag>
  );
}

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
  muted:   { color: "inherit", opacity: 0.5 },
  error:   { color: "hsl(350, 65%, 65%)" },
  success: { color: "hsl(155, 55%, 60%)" },
  strong:  { color: "inherit", fontWeight: 600 },
};

const SIZE_STYLE: Record<TextSize, React.CSSProperties> = {
  xs: { fontSize: "0.6875rem" },
  sm: { fontSize: "0.8125rem" },
  md: { fontSize: "0.875rem" },
};

export function Text({ children, variant = "default", size = "md", as: Tag = "p" }: TextProps) {
  return (
    <Tag style={{ ...VARIANT_STYLE[variant], ...SIZE_STYLE[size], margin: 0, lineHeight: 1.5 }}>
      {children}
    </Tag>
  );
}

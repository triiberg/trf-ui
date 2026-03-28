import React from "react";

export type BadgeColor =
  | "slate" | "green" | "red" | "blue" | "sky"
  | "indigo" | "violet" | "emerald" | "purple" | "orange" | "amber";

const COLOR_STYLES: Record<BadgeColor, React.CSSProperties> = {
  slate:   { background: "hsla(200, 15%, 50%, 0.15)", color: "hsl(200, 15%, 70%)" },
  green:   { background: "hsla(155, 60%, 45%, 0.15)", color: "hsl(155, 60%, 65%)" },
  red:     { background: "hsla(350, 65%, 50%, 0.15)", color: "hsl(350, 65%, 65%)" },
  blue:    { background: "hsla(215, 70%, 55%, 0.15)", color: "hsl(215, 70%, 65%)" },
  sky:     { background: "hsla(195, 80%, 45%, 0.15)", color: "hsl(195, 80%, 65%)" },
  indigo:  { background: "hsla(240, 55%, 55%, 0.15)", color: "hsl(240, 55%, 70%)" },
  violet:  { background: "hsla(260, 60%, 55%, 0.15)", color: "hsl(260, 60%, 70%)" },
  emerald: { background: "hsla(160, 55%, 45%, 0.15)", color: "hsl(160, 55%, 65%)" },
  purple:  { background: "hsla(280, 55%, 55%, 0.15)", color: "hsl(280, 55%, 70%)" },
  orange:  { background: "hsla(25, 80%, 50%, 0.15)", color: "hsl(25, 80%, 65%)" },
  amber:   { background: "hsla(38, 80%, 50%, 0.15)", color: "hsl(38, 80%, 65%)" },
};

export interface BadgeProps {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ color = "slate", children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.125rem 0.5rem",
        borderRadius: "9999px",
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        ...COLOR_STYLES[color],
      }}
    >
      {children}
    </span>
  );
}

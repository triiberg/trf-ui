import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Dark-surface card for the cosmic shell. Subtle border, soft shadow,
 * warm-dark background that lives naturally on the #232d2e shell.
 *
 * Internal text is light by default (inherits from shell).
 * Use className for spacing variants.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: "hsl(192, 14%, 16%)",
        border: "1px solid hsl(192, 12%, 22%)",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)",
        color: "hsl(200, 40%, 88%)",
      }}
    >
      {children}
    </div>
  );
}

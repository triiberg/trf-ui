import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Elevated dark surface card. Sits on the AppShell dark background.
 * Text colour is inherited from context (light on dark).
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl p-7 ${className}`}
      style={{
        background: "hsl(190, 14%, 17%)",
        border: "1px solid hsl(192, 14%, 25%)",
      }}
    >
      {children}
    </div>
  );
}

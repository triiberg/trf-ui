import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: "rgb(35, 44, 47)",
        border: "1px solid rgb(49, 60, 63)",
        borderRadius: "0.875rem",
        padding: "1.5rem",
        boxShadow: "rgba(0,0,0,0.3) 0px 1px 3px, rgba(0,0,0,0.15) 0px 8px 24px",
        color: "rgb(212, 228, 237)",
      }}
    >
      {children}
    </div>
  );
}

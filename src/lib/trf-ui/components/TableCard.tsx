import React from "react";

export interface TableCardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function TableCard({ children, footer, className = "" }: TableCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "hsl(192, 14%, 16%)",
        border: "1px solid hsl(192, 12%, 22%)",
        borderRadius: "0.875rem",
        overflow: "hidden",
        color: "hsl(200, 40%, 88%)",
      }}
    >
      <div style={{ overflowX: "auto" }}>{children}</div>
      {footer}
    </div>
  );
}

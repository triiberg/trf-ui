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
        background: "rgb(35, 44, 47)",
        border: "1px solid rgb(49, 60, 63)",
        borderRadius: "0.875rem",
        boxShadow: "rgba(0,0,0,0.3) 0px 1px 3px, rgba(0,0,0,0.15) 0px 8px 24px",
        overflow: "hidden",
        color: "rgb(212, 228, 237)",
      }}
    >
      <div style={{ overflowX: "auto" }}>{children}</div>
      {footer}
    </div>
  );
}

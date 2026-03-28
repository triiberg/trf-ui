import React from "react";

export interface TableCardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Dark rounded card that wraps a <table> with a horizontal scroll layer.
 */
export function TableCard({ children, footer, className = "" }: TableCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: "hsl(190, 14%, 17%)",
        border: "1px solid hsl(192, 14%, 25%)",
      }}
    >
      <div className="overflow-x-auto">{children}</div>
      {footer}
    </div>
  );
}

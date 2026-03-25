import React from "react";

export interface TableCardProps {
  children: React.ReactNode;
  /** Rendered below the scroll layer, inside the card — useful for pagination. */
  footer?: React.ReactNode;
  /** Extra classes on the outer container (e.g. "mb-4"). */
  className?: string;
}

/**
 * Rounded white card that wraps a <table> with a horizontal scroll layer.
 * Outer border + rounded corners are preserved on all viewports.
 */
export function TableCard({ children, footer, className = "" }: TableCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">{children}</div>
      {footer}
    </div>
  );
}

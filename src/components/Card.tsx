import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * White rounded card with a border. Use className for spacing variants,
 * e.g. className="space-y-4" for form stacking or className="p-8" for
 * larger padding.
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 ${className}`}>
      {children}
    </div>
  );
}

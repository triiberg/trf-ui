import React from "react";

export interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wide block">
        {label}
      </span>
      {children}
    </label>
  );
}

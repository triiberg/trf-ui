import React from "react";

export interface FieldProps {
  label: React.ReactNode;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <label className="block">
      <span
        className="text-xs font-semibold uppercase tracking-wide mb-1.5 block"
        style={{ color: "hsl(200, 25%, 55%)" }}
      >
        {label}
        {required && <span style={{ color: "hsl(0, 80%, 65%)", marginLeft: "0.2em" }}>*</span>}
      </span>
      {hint && (
        <span className="text-xs mb-1 block" style={{ opacity: 0.5 }}>{hint}</span>
      )}
      {children}
    </label>
  );
}

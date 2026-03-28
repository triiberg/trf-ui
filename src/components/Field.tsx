import React from "react";

export interface FieldProps {
  label: React.ReactNode;
  /** Small helper text shown below the label. */
  hint?: string;
  /** Required asterisk. */
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </span>
      {hint && <span className="text-xs text-slate-500 mb-1 block">{hint}</span>}
      {children}
    </label>
  );
}

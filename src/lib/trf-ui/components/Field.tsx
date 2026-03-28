import React from "react";

export interface FieldProps {
  label: React.ReactNode;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, hint, required, children }: FieldProps) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
          color: "hsl(200, 30%, 55%)",
          marginBottom: "0.5rem",
        }}
      >
        {label}
        {required && <span style={{ color: "hsl(350, 80%, 60%)", marginLeft: "0.25rem" }}>*</span>}
      </span>
      {hint && (
        <span
          style={{
            display: "block",
            fontSize: "0.75rem",
            color: "hsl(200, 20%, 50%)",
            marginBottom: "0.375rem",
          }}
        >
          {hint}
        </span>
      )}
      {children}
    </label>
  );
}

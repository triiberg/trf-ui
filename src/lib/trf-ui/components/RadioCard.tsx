import React from "react";

export interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  extra?: React.ReactNode;
  disabledSelection?: boolean;
}

export function RadioCard({ name, value, checked, onChange, title, description, extra, disabledSelection }: RadioCardProps) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.75rem",
        padding: "1rem 1.125rem",
        cursor: disabledSelection ? "not-allowed" : "pointer",
        transition: "border-color 0.15s, background 0.15s",
        background: checked ? "hsla(195, 80%, 45%, 0.08)" : "hsl(192, 12%, 14%)",
        border: `1px solid ${checked ? "hsl(195, 60%, 40%)" : "hsl(192, 12%, 22%)"}`,
        opacity: disabledSelection ? 0.45 : 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: checked ? "hsl(195, 80%, 70%)" : "hsl(200, 40%, 85%)" }}>
          {title}
        </span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabledSelection}
          onChange={() => !disabledSelection && onChange(value)}
          style={{ width: "1rem", height: "1rem", accentColor: "hsl(195, 80%, 50%)" }}
        />
      </div>
      {description && (
        <p style={{ fontSize: "0.8125rem", color: "hsl(200, 25%, 55%)", margin: 0, lineHeight: 1.45 }}>
          {description}
        </p>
      )}
      {extra != null && <div style={{ marginTop: "0.625rem" }}>{extra}</div>}
    </label>
  );
}

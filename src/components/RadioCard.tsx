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
    <label style={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "0.875rem",
      padding: "1rem 1.25rem",
      cursor: disabledSelection ? "not-allowed" : "pointer",
      transition: "border-color 0.15s",
      background: checked ? "rgba(0, 210, 200, 0.08)" : "rgb(35, 44, 47)",
      border: `1px solid ${checked ? "hsl(185, 100%, 55%)" : "rgb(49, 60, 63)"}`,
      boxShadow: "rgba(0,0,0,0.2) 0px 1px 3px",
      opacity: disabledSelection ? 0.45 : 1,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgb(212, 228, 237)" }}>{title}</span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabledSelection}
          onChange={() => !disabledSelection && onChange(value)}
          style={{ width: "1rem", height: "1rem", accentColor: "hsl(185, 100%, 55%)" }}
        />
      </div>
      {description && (
        <p style={{ fontSize: "0.8125rem", color: "rgb(106, 152, 175)", margin: 0 }}>{description}</p>
      )}
      {extra != null && <div style={{ marginTop: "0.625rem" }}>{extra}</div>}
    </label>
  );
}

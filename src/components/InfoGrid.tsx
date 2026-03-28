import React from "react";

export interface InfoGridProps {
  children: React.ReactNode;
  cols?: 1 | 2;
}

export function InfoGrid({ children, cols = 2 }: InfoGridProps) {
  return (
    <div
      className={cols === 2 ? "sm:grid-cols-2" : ""}
      style={{ display: "grid", gap: "1.25rem" }}
    >
      {children}
    </div>
  );
}

export interface InfoFieldProps {
  label: string;
  value?: React.ReactNode;
  span?: boolean;
}

export function InfoField({ label, value, span = false }: InfoFieldProps) {
  const isEmpty = value == null || value === "";
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <p style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "rgb(106, 152, 175)",
        margin: "0 0 0.375rem",
      }}>
        {label}
      </p>
      <p style={{
        fontSize: "0.875rem",
        margin: 0,
        color: isEmpty ? "rgb(82, 109, 122)" : "rgb(212, 228, 237)",
        fontStyle: isEmpty ? "italic" : "normal",
      }}>
        {isEmpty ? "Not provided" : value}
      </p>
    </div>
  );
}

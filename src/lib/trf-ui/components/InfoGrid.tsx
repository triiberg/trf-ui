import React from "react";

export interface InfoGridProps {
  children: React.ReactNode;
  /** Number of columns on medium screens. Defaults to 2. */
  cols?: 1 | 2 | 3;
}

/** Two-column grid for labeled data fields. Use <InfoField> as direct children. */
export function InfoGrid({ children, cols = 2 }: InfoGridProps) {
  const colClass =
    cols === 3 ? "sm:grid-cols-3" :
    cols === 2 ? "sm:grid-cols-2" : "";
  return (
    <div
      style={{ display: "grid", gap: "1.25rem" }}
      className={colClass}
    >
      {children}
    </div>
  );
}

export interface InfoFieldProps {
  label: string;
  value?: React.ReactNode;
  /** Span all columns. */
  span?: boolean;
}

/** Labelled value cell for use inside <InfoGrid>. */
export function InfoField({ label, value, span = false }: InfoFieldProps) {
  const isEmpty = value == null || value === "" || value === "—";

  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "hsl(200, 30%, 55%)",
          margin: "0 0 0.375rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          margin: 0,
          color: isEmpty ? "hsl(200, 20%, 40%)" : "hsl(200, 40%, 88%)",
          fontStyle: isEmpty ? "italic" : "normal",
        }}
      >
        {isEmpty ? "Not provided" : value}
      </p>
    </div>
  );
}

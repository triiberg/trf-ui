import React from "react";

export interface InfoGridProps {
  children: React.ReactNode;
  cols?: 1 | 2;
}

/** Two-column grid for labeled data fields. Use <InfoField> as direct children. */
export function InfoGrid({ children, cols = 2 }: InfoGridProps) {
  return (
    <div className={`grid gap-4 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {children}
    </div>
  );
}

export interface InfoFieldProps {
  label: string;
  value?: React.ReactNode;
  /** Span both columns. */
  span?: boolean;
}

/** Labelled value cell for use inside <InfoGrid>. */
export function InfoField({ label, value, span = false }: InfoFieldProps) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <p
        className="text-xs uppercase tracking-wide mb-1"
        style={{ color: "hsl(200, 25%, 55%)" }}
      >
        {label}
      </p>
      <p className="text-sm" style={{ color: "inherit" }}>{value ?? "—"}</p>
    </div>
  );
}

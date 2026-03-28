import React from "react";

const GAP: Record<number, string> = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
};

export interface StackProps {
  children: React.ReactNode;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
}

/** Vertical flex column with even gap between children. */
export function Stack({ children, gap = 4 }: StackProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: GAP[gap] ?? "1rem" }}>
      {children}
    </div>
  );
}

import React from "react";

const GAP: Record<number, string> = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
};

export interface RowProps {
  children: React.ReactNode;
  gap?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

/** Horizontal flex row. Use <Grow> inside to fill remaining space. */
export function Row({ children, gap = 3, align = "center", justify = "start", wrap = false }: RowProps) {
  const justifyMap = { start: "flex-start", center: "center", end: "flex-end", between: "space-between" };
  const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch" };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: GAP[gap] ?? "0.75rem",
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? "wrap" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/** Fills remaining horizontal space inside a <Row>. */
export function Grow({ children }: { children: React.ReactNode }) {
  return <div style={{ flex: 1, minWidth: 0 }}>{children}</div>;
}

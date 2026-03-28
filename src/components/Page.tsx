import React from "react";

const SIZE_MAX: Record<PageSize, string> = {
  sm: "36rem",
  md: "48rem",
  lg: "56rem",
  xl: "64rem",
  "2xl": "80rem",
  full: "none",
};

export type PageSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface PageProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  size?: PageSize;
}

export function Page({ children, title, subtitle, action, size = "lg" }: PageProps) {
  return (
    <div style={{ maxWidth: SIZE_MAX[size] }}>
      {(title != null || action != null) && (
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "2rem",
        }}>
          <div>
            {title != null && (
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2, margin: 0, color: "inherit" }}>
                {title}
              </h1>
            )}
            {subtitle != null && (
              <p style={{ fontSize: "0.875rem", color: "rgb(106, 152, 175)", margin: "0.375rem 0 0" }}>
                {subtitle}
              </p>
            )}
          </div>
          {action != null && <div style={{ flexShrink: 0 }}>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

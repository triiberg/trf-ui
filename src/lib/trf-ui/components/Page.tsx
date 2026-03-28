import React from "react";

const SIZE_CLASSES: Record<PageSize, string> = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
  full: "",
};

export type PageSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface PageProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  size?: PageSize;
}

/**
 * Content area wrapper with optional title / subtitle / action header.
 * Consistent padding & max-width. Inherits text colour from AppShell.
 */
export function Page({ children, title, subtitle, action, size = "lg" }: PageProps) {
  return (
    <div className={SIZE_CLASSES[size]}>
      {(title != null || action != null) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div>
            {title != null && (
              <h1
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: 0,
                  color: "inherit",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h1>
            )}
            {subtitle != null && (
              <p
                style={{
                  fontSize: "0.875rem",
                  opacity: 0.5,
                  margin: "0.375rem 0 0",
                }}
              >
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

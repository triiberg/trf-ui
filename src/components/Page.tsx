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
  /** Large heading at the top of the page. */
  title?: React.ReactNode;
  /** Smaller text below the title. */
  subtitle?: React.ReactNode;
  /** Element placed to the right of the title (e.g. an action button). */
  action?: React.ReactNode;
  size?: PageSize;
}

/**
 * Content area wrapper with optional title / subtitle / action header.
 * Width-constrained and horizontally centred. Inherits text colour from AppShell.
 */
export function Page({ children, title, subtitle, action, size = "lg" }: PageProps) {
  return (
    <div className={SIZE_CLASSES[size]}>
      {(title != null || action != null) && (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
          <div>
            {title != null && (
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2, margin: 0, color: "inherit" }}>
                {title}
              </h1>
            )}
            {subtitle != null && (
              <p style={{ fontSize: "0.875rem", opacity: 0.6, marginTop: "0.375rem", margin: "0.375rem 0 0" }}>
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

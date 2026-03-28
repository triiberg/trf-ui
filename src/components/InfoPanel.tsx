import React from "react";

export interface InfoPanelProps {
  title?: string;
  children: React.ReactNode;
}

/** Inset dark panel for supplementary information (service lists, notes, etc.). */
export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div
      className="rounded-lg px-4 py-4"
      style={{
        background: "hsl(190, 16%, 12%)",
        border: "1px solid hsl(192, 14%, 20%)",
      }}
    >
      {title && (
        <p className="text-sm font-semibold mb-2" style={{ color: "inherit" }}>
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

import React from "react";

export interface ErrorBoxProps {
  children: React.ReactNode;
}

/** Dark red-tinted error message box. */
export function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <div
      className="rounded-lg px-4 py-3"
      style={{
        background: "hsl(0, 25%, 16%)",
        border: "1px solid hsl(0, 45%, 30%)",
      }}
    >
      <p className="text-sm" style={{ color: "hsl(0, 80%, 72%)" }}>{children}</p>
    </div>
  );
}

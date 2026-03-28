import React from "react";

export interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export function H2({ children, className = "" }: H2Props) {
  return (
    <h2
      className={className}
      style={{ fontSize: "1.125rem", fontWeight: 600, color: "inherit", margin: "0 0 0.75rem" }}
    >
      {children}
    </h2>
  );
}

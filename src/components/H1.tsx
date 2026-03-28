import React from "react";

export interface H1Props {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className = "" }: H1Props) {
  return (
    <h1
      className={className}
      style={{ fontSize: "1.5rem", fontWeight: 700, color: "inherit", margin: "0 0 1rem" }}
    >
      {children}
    </h1>
  );
}

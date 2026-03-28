import React from "react";

export interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export function H2({ children, className = "" }: H2Props) {
  return (
    <h2 className={`text-lg font-semibold text-inherit ${className}`}>
      {children}
    </h2>
  );
}

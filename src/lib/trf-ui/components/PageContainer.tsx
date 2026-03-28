import React from "react";

const SIZE_CLASSES: Record<PageContainerSize, string> = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
};

export type PageContainerSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface PageContainerProps {
  children: React.ReactNode;
  /** Controls the max-width of the container. Defaults to "lg" (max-w-4xl). */
  size?: PageContainerSize;
  className?: string;
}

export function PageContainer({
  children,
  size = "lg",
  className = "",
}: PageContainerProps) {
  return (
    <div className={`${SIZE_CLASSES[size]} mx-auto ${className}`}>
      {children}
    </div>
  );
}

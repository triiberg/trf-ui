import React from "react";

export interface ErrorBoxProps {
  children: React.ReactNode;
}

/** Red bordered box for error messages. */
export function ErrorBox({ children }: ErrorBoxProps) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 max-w-md">
      <p className="text-sm text-rose-700">{children}</p>
    </div>
  );
}

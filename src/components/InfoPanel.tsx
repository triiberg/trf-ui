import React from "react";

export interface InfoPanelProps {
  title?: string;
  children: React.ReactNode;
}

/** Soft light-grey panel for supplementary information (service lists, notes, etc.). */
export function InfoPanel({ title, children }: InfoPanelProps) {
  return (
    <div className="rounded-lg bg-slate-50 border border-slate-200 px-4 py-4">
      {title && <p className="text-sm font-semibold text-slate-800 mb-2">{title}</p>}
      {children}
    </div>
  );
}

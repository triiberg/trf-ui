import React from "react";

export interface StepCardProps {
  /** Step number displayed in the badge. */
  step: number;
  title: string;
  subtitle?: string;
  /** Text shown on the right when this step is collapsed (e.g. current value). */
  summary?: string;
  open: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

/**
 * Accordion-style card for multi-step wizards.
 * Always white/light — designed to appear inside a dark AppShell.
 */
export function StepCard({ step, title, subtitle, summary, open, onOpen, children }: StepCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-5 text-left"
        onClick={onOpen}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700 shrink-0">
            {step}
          </span>
          <div>
            <p className="text-base font-semibold text-slate-900 leading-tight">{title}</p>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <span className="text-sm text-slate-400 shrink-0 ml-4">{open ? "▲" : (summary ?? "▼")}</span>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-6">
          {children}
        </div>
      )}
    </div>
  );
}

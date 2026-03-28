import React from "react";

export interface StepCardProps {
  step: number;
  title: string;
  subtitle?: string;
  summary?: string;
  open: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

/**
 * Accordion-style card for multi-step wizards. Dark-themed.
 */
export function StepCard({ step, title, subtitle, summary, open, onOpen, children }: StepCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "hsl(190, 14%, 17%)",
        border: "1px solid hsl(192, 14%, 25%)",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-5 text-left"
        onClick={onOpen}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold shrink-0"
            style={{
              background: "hsl(185, 80%, 18%)",
              color: "hsl(185, 100%, 65%)",
              border: "1px solid hsl(185, 60%, 30%)",
            }}
          >
            {step}
          </span>
          <div>
            <p className="text-base font-semibold leading-tight" style={{ color: "inherit" }}>{title}</p>
            {subtitle && (
              <p className="text-sm mt-0.5" style={{ opacity: 0.6 }}>{subtitle}</p>
            )}
          </div>
        </div>
        <span className="text-sm shrink-0 ml-4" style={{ opacity: 0.5 }}>
          {open ? "▲" : (summary ?? "▼")}
        </span>
      </button>
      {open && (
        <div
          className="px-5 py-6"
          style={{ borderTop: "1px solid hsl(192, 14%, 23%)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

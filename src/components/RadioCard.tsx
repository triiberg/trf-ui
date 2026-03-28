import React from "react";

export interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  /** Extra content rendered at the bottom (e.g. price). */
  extra?: React.ReactNode;
}

/**
 * Selectable card with a radio button. Highlights with a sky border when checked.
 * Use inside a grid for multi-option layouts.
 */
export function RadioCard({ name, value, checked, onChange, title, description, extra }: RadioCardProps) {
  return (
    <label
      className={`flex flex-col rounded-xl border px-4 py-4 cursor-pointer transition-colors ${
        checked ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="h-4 w-4 text-sky-600"
        />
      </div>
      {description && <p className="text-sm text-slate-500">{description}</p>}
      {extra != null && <div className="mt-2">{extra}</div>}
    </label>
  );
}

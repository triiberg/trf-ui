import React from "react";

export interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  extra?: React.ReactNode;
}

/**
 * Selectable card with a radio button. Dark-themed with cyan highlight when checked.
 */
export function RadioCard({ name, value, checked, onChange, title, description, extra }: RadioCardProps) {
  return (
    <label
      className="flex flex-col rounded-xl px-4 py-4 cursor-pointer transition-all"
      style={{
        background: checked ? "hsl(185, 35%, 18%)" : "hsl(190, 14%, 17%)",
        border: `1px solid ${checked ? "hsl(185, 100%, 55%)" : "hsl(192, 14%, 25%)"}`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold" style={{ color: "inherit" }}>{title}</span>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="h-4 w-4"
          style={{ accentColor: "hsl(185, 100%, 55%)" }}
        />
      </div>
      {description && (
        <p className="text-sm" style={{ opacity: 0.6 }}>{description}</p>
      )}
      {extra != null && <div className="mt-2">{extra}</div>}
    </label>
  );
}

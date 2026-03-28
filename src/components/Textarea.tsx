import React from "react";

const BASE =
  "w-full border rounded-lg text-sm text-slate-900 placeholder-slate-400 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors";

export function Textarea({
  className = "",
  style,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ background: "hsl(190, 20%, 92%)", borderColor: "hsl(190, 15%, 75%)", ...style }}
      className={`${BASE} ${className}`}
    />
  );
}

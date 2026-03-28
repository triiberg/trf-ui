import React from "react";

const BASE =
  "w-full border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3 py-2.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-colors";

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${BASE} ${className}`} />;
}

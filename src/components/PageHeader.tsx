import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-inherit">{title}</h1>
        {subtitle && <p className="text-sm opacity-60 mt-1">{subtitle}</p>}
      </div>
      {action != null && <div>{action}</div>}
    </div>
  );
}

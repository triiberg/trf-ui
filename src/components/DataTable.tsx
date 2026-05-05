import React from "react";
import type { CSSProperties } from "react";

export const dataTableHeaderCellStyle: CSSProperties = {
  textAlign: "left",
  padding: "0.75rem 1rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "rgb(106, 152, 175)",
  backgroundColor: "rgba(0,0,0,0.15)",
  whiteSpace: "nowrap",
};

export const dataTableCellStyle: CSSProperties = {
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "rgb(212, 228, 237)",
};

export const dataTableRowBorder: CSSProperties = {
  borderTop: "1px solid rgb(49, 60, 63)",
};

export interface DataTableProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  minWidth?: string | number;
}

export function DataTable({ children, footer, minWidth = "480px" }: DataTableProps) {
  return (
    <div
      style={{
        background: "rgb(35, 44, 47)",
        border: "1px solid rgb(49, 60, 63)",
        borderRadius: "0.875rem",
        boxShadow: "rgba(0,0,0,0.3) 0px 1px 3px, rgba(0,0,0,0.15) 0px 8px 24px",
        overflow: "hidden",
        color: "rgb(212, 228, 237)",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth }}>
          {children}
        </table>
      </div>
      {footer && (
        <div style={{ borderTop: "1px solid rgb(49, 60, 63)" }}>
          {footer}
        </div>
      )}
    </div>
  );
}

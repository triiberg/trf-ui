import React from "react";
import { ErrorBox } from "./ErrorBox";

export interface LoadingStateProps {
  title: string;
  description?: string;
  error?: string | null;
}

/**
 * Full-page-height centred loading indicator.
 * Use while polling async operations (e.g. org provisioning).
 */
export function LoadingState({ title, description, error }: LoadingStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
      }}
    >
      {/* spinner */}
      <div
        style={{
          width: "4rem",
          height: "4rem",
          borderRadius: "9999px",
          border: "3px solid transparent",
          borderBottomColor: "hsl(185,100%,55%)",
          animation: "spin 0.8s linear infinite",
          marginBottom: "1.5rem",
        }}
      />
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem", color: "inherit" }}>{title}</h2>
      {description && (
        <p style={{ opacity: 0.7, margin: "0 0 1rem", fontSize: "0.875rem" }}>{description}</p>
      )}
      {error && (
        <div style={{ marginTop: "1rem" }}>
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}
      <p style={{ opacity: 0.5, fontSize: "0.8125rem", marginTop: "1rem" }}>
        This usually takes a few seconds…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

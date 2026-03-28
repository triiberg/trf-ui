import { ErrorBox } from "./ErrorBox";

export interface LoadingStateProps {
  title: string;
  description?: string;
  error?: string | null;
}

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
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "9999px",
          border: "2.5px solid transparent",
          borderBottomColor: "hsl(195, 80%, 55%)",
          animation: "spin 0.8s linear infinite",
          marginBottom: "1.5rem",
        }}
      />
      <h2 style={{ fontSize: "1.125rem", fontWeight: 700, margin: "0 0 0.5rem", color: "inherit" }}>{title}</h2>
      {description && (
        <p style={{ opacity: 0.5, margin: "0 0 1rem", fontSize: "0.8125rem" }}>{description}</p>
      )}
      {error && (
        <div style={{ marginTop: "1rem" }}>
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}
      <p style={{ opacity: 0.35, fontSize: "0.75rem", marginTop: "1rem" }}>
        This usually takes a few seconds…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

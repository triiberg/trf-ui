import { ErrorBox } from "./ErrorBox";

export interface LoadingStateProps {
  title: string;
  description?: string;
  error?: string | null;
}

export function LoadingState({ title, description, error }: LoadingStateProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "400px",
      textAlign: "center",
      color: "inherit",
    }}>
      <div style={{
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "9999px",
        border: "3px solid rgba(0,210,200,0.2)",
        borderTopColor: "hsl(185,100%,55%)",
        animation: "trf-spin 0.8s linear infinite",
        marginBottom: "1.5rem",
      }} />
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.5rem", color: "inherit" }}>{title}</h2>
      {description && (
        <p style={{ color: "rgb(106, 152, 175)", margin: "0 0 1rem", fontSize: "0.875rem" }}>{description}</p>
      )}
      {error && (
        <div style={{ marginTop: "1rem", maxWidth: "28rem" }}>
          <ErrorBox>{error}</ErrorBox>
        </div>
      )}
      <p style={{ color: "rgb(82, 109, 122)", fontSize: "0.8125rem", marginTop: "1rem" }}>
        This usually takes a few seconds…
      </p>
      <style>{`@keyframes trf-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

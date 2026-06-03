import React, { useCallback, useEffect, useRef, useState } from "react";

export interface FloatingDocViewerProps {
  src: string;
  fileName: string;
  onClose: () => void;
}

const HEADER_H = 38;

// Detect MIME type from the first bytes of the file so we don't trust
// whatever (possibly wrong) Content-Type the server sends.
function sniffMime(bytes: Uint8Array, serverMime: string): string {
  // PDF: %PDF
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }
  // PNG: \x89PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  }
  // JPEG: \xFF\xD8
  if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  }
  // GIF: GIF8
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return "image/gif";
  }
  // WebP: RIFF????WEBP
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return serverMime || "application/octet-stream";
}

export function FloatingDocViewer({ src, fileName, onClose }: FloatingDocViewerProps) {
  const [dims] = useState(() => ({
    w: Math.round(window.innerWidth * 0.25),
    h: Math.round(window.innerHeight * 0.5),
  }));

  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({
    x: window.innerWidth - Math.round(window.innerWidth * 0.25) - 24,
    y: 24,
  }));

  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    setLoading(true);
    setError(false);
    setBlobUrl(null);
    setMimeType("");

    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        const serverMime = (r.headers.get("content-type") ?? "").split(";")[0].trim();
        return r.arrayBuffer().then((buf) => ({ buf, serverMime }));
      })
      .then(({ buf, serverMime }) => {
        const mime = sniffMime(new Uint8Array(buf, 0, 12), serverMime);
        setMimeType(mime);
        objectUrl = URL.createObjectURL(new Blob([buf], { type: mime }));
        setBlobUrl(objectUrl);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  // ── Drag ──────────────────────────────────────────────────────────────────

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const onHeaderMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      dragging.current = true;
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      e.preventDefault();
    },
    [pos],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const x = Math.max(0, Math.min(window.innerWidth - dims.w, e.clientX - dragOffset.current.x));
      const y = Math.max(0, Math.min(window.innerHeight - HEADER_H, e.clientY - dragOffset.current.y));
      setPos({ x, y });
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dims]);

  // ── Render ────────────────────────────────────────────────────────────────

  const isImage = mimeType.startsWith("image/");

  const renderContent = () => {
    if (loading) {
      return (
        <div style={centerStyle}>
          <div style={spinnerStyle} />
        </div>
      );
    }
    if (error || !blobUrl) {
      return (
        <div style={centerStyle}>
          <span style={{ color: "rgb(255,140,130)", fontSize: "0.8125rem" }}>
            Could not load document.
          </span>
        </div>
      );
    }
    if (isImage) {
      return (
        <img
          src={blobUrl}
          alt={fileName}
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
      );
    }
    // iframe + blob typed as application/pdf invokes Chrome's built-in PDFium viewer.
    // <embed> is NOT used — it triggers the removed NPAPI plugin path on Linux.
    return (
      <iframe
        src={blobUrl}
        title={fileName}
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: dims.w,
        height: dims.h,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        background: "rgb(28, 36, 38)",
        border: "1px solid rgb(49, 60, 63)",
        borderRadius: "0.75rem",
        boxShadow: "0 8px 40px rgba(0,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      <div
        onMouseDown={onHeaderMouseDown}
        style={{
          height: HEADER_H,
          minHeight: HEADER_H,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.625rem 0 0.875rem",
          background: "rgb(35, 44, 47)",
          borderBottom: "1px solid rgb(49, 60, 63)",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "rgb(106, 152, 175)",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "calc(100% - 2rem)",
          }}
          title={fileName}
        >
          {fileName}
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "rgb(106, 152, 175)",
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
            padding: "0.25rem",
            borderRadius: "0.375rem",
            flexShrink: 0,
          }}
          title="Close"
        >
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflow: "hidden", background: "rgb(20, 26, 28)" }}>
        {renderContent()}
      </div>
    </div>
  );
}

const centerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const spinnerStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  border: "3px solid rgba(106,152,175,0.2)",
  borderTopColor: "rgb(106,152,175)",
  borderRadius: "50%",
  animation: "trf-spin 0.7s linear infinite",
};

if (typeof document !== "undefined") {
  const id = "trf-floating-doc-spin";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = "@keyframes trf-spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
  }
}

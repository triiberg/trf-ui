import React, { useCallback, useEffect, useRef, useState } from "react";

export interface FloatingDocViewerProps {
  src: string;
  fileName: string;
  mimeType?: string;
  onClose: () => void;
}

const HEADER_H = 38;

export function FloatingDocViewer({
  src,
  fileName,
  mimeType = "",
  onClose,
}: FloatingDocViewerProps) {
  const [dims] = useState(() => ({
    w: Math.round(window.innerWidth * 0.25),
    h: Math.round(window.innerHeight * 0.5),
  }));

  const [pos, setPos] = useState<{ x: number; y: number }>(() => ({
    x: window.innerWidth - Math.round(window.innerWidth * 0.25) - 24,
    y: 24,
  }));

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const onHeaderMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    e.preventDefault();
  }, [pos]);

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

  const isImage = mimeType.startsWith("image/");

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
        userSelect: dragging.current ? "none" : "auto",
      }}
    >
      {/* Drag handle / title bar */}
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

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", background: "rgb(20, 26, 28)" }}>
        {isImage ? (
          <img
            src={src}
            alt={fileName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <iframe
            src={src}
            title={fileName}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
}

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { InputSize } from "./Input";

export interface AccountOption {
  id: string;
  code: string;
  name: string;
}

export interface FilterPreset {
  label: string;
  match: (code: string) => boolean;
}

export interface AccountComboboxProps {
  accounts: AccountOption[];
  presets?: FilterPreset[];
  value: string;
  onChange: (id: string, account?: AccountOption) => void;
  placeholder?: string;
  size?: InputSize;
  block?: boolean;
  hasError?: boolean;
  disabled?: boolean;
}

const INPUT_BASE =
  "border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors";

const SIZE: Record<InputSize, string> = {
  sm: "px-3 py-1.5",
  md: "px-3 py-2.5",
  lg: "px-4 py-3",
};

const INPUT_STYLE: React.CSSProperties = {
  background: "rgb(25, 35, 38)",
  borderColor: "rgb(49, 60, 63)",
  color: "rgb(212, 228, 237)",
};

const ERROR_BORDER: React.CSSProperties = {
  borderColor: "rgb(255, 140, 130)",
};

export function AccountCombobox({
  accounts,
  presets,
  value,
  onChange,
  placeholder = "Search accounts…",
  size = "md",
  block = true,
  hasError = false,
  disabled = false,
}: AccountComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedAccount = accounts.find((a) => a.id === value);

  useEffect(() => {
    if (!open) {
      setInputValue(
        selectedAccount ? `${selectedAccount.code} ${selectedAccount.name}` : ""
      );
    }
  }, [value, accounts, open, selectedAccount]);

  const activeMatch = presets?.[activePreset]?.match ?? (() => true);
  const filtered = accounts
    .filter((a) => activeMatch(a.code))
    .filter(
      (a) =>
        !inputValue ||
        `${a.code} ${a.name}`.toLowerCase().includes(inputValue.toLowerCase())
    );

  const select = useCallback(
    (account: AccountOption) => {
      onChange(account.id, account);
      setOpen(false);
      setInputValue(`${account.code} ${account.name}`);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      select(filtered[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const item = listRef.current.children[highlighted] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  const handleFocus = () => {
    setOpen(true);
    setInputValue("");
    setHighlighted(-1);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (listRef.current?.contains(e.relatedTarget as Node)) return;
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: block ? "100%" : undefined }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => {
          setInputValue(e.target.value);
          setHighlighted(-1);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${INPUT_BASE} ${SIZE[size]} ${block ? "w-full" : ""}`}
        style={{ ...INPUT_STYLE, ...(hasError ? ERROR_BORDER : {}) }}
      />
      {open && (
        <div
          ref={listRef}
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgb(25, 35, 38)",
            border: "1px solid rgb(49, 60, 63)",
            borderRadius: "0.5rem",
            marginTop: "0.25rem",
            maxHeight: "16rem",
            overflowY: "auto",
          }}
        >
          {presets && presets.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                padding: "0.5rem",
                borderBottom: "1px solid rgb(49, 60, 63)",
                flexWrap: "wrap",
              }}
            >
              {presets.map((p, i) => (
                <button
                  key={p.label}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setActivePreset(i);
                    setHighlighted(-1);
                  }}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "9999px",
                    border: "1px solid",
                    cursor: "pointer",
                    background:
                      activePreset === i ? "rgb(74, 144, 164)" : "transparent",
                    borderColor:
                      activePreset === i
                        ? "rgb(74, 144, 164)"
                        : "rgb(82, 109, 122)",
                    color:
                      activePreset === i
                        ? "rgb(212, 228, 237)"
                        : "rgb(130, 160, 175)",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                color: "rgb(82, 109, 122)",
              }}
            >
              No accounts found
            </div>
          ) : (
            filtered.map((a, i) => (
              <div
                key={a.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(a);
                }}
                onMouseEnter={() => setHighlighted(i)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  background:
                    i === highlighted ? "rgb(35, 55, 65)" : "transparent",
                  color: "rgb(212, 228, 237)",
                }}
              >
                <span
                  style={{
                    color: "rgb(130, 160, 175)",
                    marginRight: "0.5rem",
                    fontFamily: "monospace",
                  }}
                >
                  {a.code}
                </span>
                {a.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

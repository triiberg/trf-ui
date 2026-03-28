import { DEFAULT_DISCOVERY_AUTH_COOKIE_NAME } from "./config";

export const getOrganizationNameFromJwt = (cookieName?: string): string | null => {
  if (typeof document === "undefined") return null;
  const name = cookieName?.trim() || DEFAULT_DISCOVERY_AUTH_COOKIE_NAME;
  const cookies = document.cookie.split(";");
  let token: string | undefined;
  for (const chunk of cookies) {
    const [rawName, ...rawValueParts] = chunk.split("=");
    if ((rawName ?? "").trim() === name) {
      token = rawValueParts.join("=").trim();
      break;
    }
  }
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const payload = JSON.parse(json);
    return payload?.organization?.name || null;
  } catch {
    return null;
  }
};
